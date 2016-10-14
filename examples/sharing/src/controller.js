// @flow
import * as Ship from 'redux-ship';
import * as LukeController from './luke/controller';
import * as Model from './model';

export type Action = {
  type: 'First',
  action: LukeController.Action,
} | {
  type: 'Second',
  action: LukeController.Action,
};

export type State = Model.State;

export type Commit = {
  type: 'First',
  commit: LukeController.Commit,
} | {
  type: 'Second',
  commit: LukeController.Commit,
};

export type Patch = Model.Patch;

export function applyCommit(commit: Commit): Patch {
  switch (commit.type) {
  case 'First': {
    const patch = LukeController.applyCommit(commit.commit);
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.luke && {first: patch.luke},
    };
  }
  case 'Second': {
    const patch = LukeController.applyCommit(commit.commit);
    return {
      ...patch.counter && {counter: patch.counter},
      ...patch.luke && {second: patch.luke},
    };
  }
  default:
    return {};
  }
}

export function* control(action: Action): Ship.Ship<*, Commit, State, void> {
  switch (action.type) {
  case 'First':
    return yield* Ship.map(
      (commit) => ({type: 'First', commit}),
      (state) => ({
        counter: state.counter,
        luke: state.first,
      }),
      LukeController.control(action.action)
    );
  case 'Second':
    return yield* Ship.map(
      (commit) => ({type: 'Second', commit}),
      (state) => ({
        counter: state.counter,
        luke: state.second,
      }),
      LukeController.control(action.action)
    );
  default:
    return;
  }
}
