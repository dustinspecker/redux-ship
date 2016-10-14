// @flow
import * as Ship from 'redux-ship';
import * as Effect from '../effect';
import * as Model from './model';
import * as CounterModel from '../counter/model';

export type Action = {
  type: 'Load',
};

export type State = {
  counter: CounterModel.State,
  luke: Model.State,
};

export type Commit = {
  type: 'LoadStart',
} | {
  type: 'LoadSuccess',
  fullName: string,
};

export type Patch = {
  counter?: CounterModel.Patch,
  luke?: Model.Patch,
};

export function applyCommit(commit: Commit): Patch {
  switch (commit.type) {
  case 'LoadStart':
    return {
      luke: {type: 'LoadStart'},
    };
  case 'LoadSuccess':
    return {
      counter: {type: 'Increment'},
      luke: {type: 'LoadSuccess', fullName: commit.fullName},
    };
  default:
    return {};
  }
}

export function* control(action: Action): Ship.Ship<*, Commit, State, void> {
  switch (action.type) {
  case 'Load': {
    yield* Ship.dispatch({
      type: 'LoadStart',
    });
    const result = yield* Effect.httpRequest('http://swapi.co/api/people/1/');
    const fullName: ?string = JSON.parse(result).name;
    if (fullName) {
      yield* Ship.dispatch({
        type: 'LoadSuccess',
        fullName,
      });
    }
    return;
  }
  default:
    return;
  }
}
