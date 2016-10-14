// @flow

export type State = number;

export const initialState: State = 0;

export type Patch = {
  type: 'Increment',
};

export function applyPatch(state: State, patch: Patch): State {
  switch (patch.type) {
  case 'Increment':
    return state + 1;
  default:
    return state;
  }
}
