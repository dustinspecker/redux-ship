// @flow

export type State = {
  isLoading: bool,
  fullName: ?string,
};

export const initialState: State = {
  isLoading: false,
  fullName: null,
};

export type Patch = {
  type: 'LoadStart',
} | {
  type: 'LoadSuccess',
  fullName: string,
};

export function applyPatch(state: State, patch: Patch): State {
  switch (patch.type) {
  case 'LoadStart':
    return {
      ...state,
      isLoading: true,
    };
  case 'LoadSuccess':
    return {
      ...state,
      isLoading: false,
      fullName: patch.fullName,
    };
  default:
    return state;
  }
}
