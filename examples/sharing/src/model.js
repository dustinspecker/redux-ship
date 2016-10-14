// @flow
import * as CounterModel from './counter/model';
import * as LukeModel from './luke/model';

export type State = {
  counter: CounterModel.State,
  first: LukeModel.State,
  second: LukeModel.State,
};

export const initialState: State = {
  counter: CounterModel.initialState,
  first: LukeModel.initialState,
  second: LukeModel.initialState,
};

export type Patch = {
  counter?: CounterModel.Patch,
  first?: LukeModel.Patch,
  second?: ?LukeModel.Patch,
};

export function applyPatch(state: State, patch: Patch): State {
  return {
    ...state,
    ...patch.counter && {counter: CounterModel.applyPatch(state.counter, patch.counter)},
    ...patch.first && {first: LukeModel.applyPatch(state.first, patch.first)},
    ...patch.second && {second: LukeModel.applyPatch(state.second, patch.second)},
  };
}
