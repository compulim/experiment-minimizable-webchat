import { useEffect, useMemo, useReducer } from 'react';

const CloseActionType = Symbol('CLOSE');
const OpenActionType = Symbol('OPEN');

type Action = typeof CloseActionType | typeof OpenActionType;

type State = {
  initialized: boolean;
  opened: boolean;
  token?: string;
};

type ActionCreator = {
  close: () => void;
  open: () => void;
};

export default function useFloatingPopoverReducer(): readonly [Readonly<State>, ActionCreator] {
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => () => abortController.abort(), [abortController]);

  const [state, dispatch] = useReducer(
    (state: Readonly<State>, action: Action) => {
      if (action === CloseActionType) {
        state = { ...state, opened: false };
      } else if (action === OpenActionType) {
        state = { ...state, initialized: true, opened: true };
      }

      return state;
    },
    { initialized: false, opened: false }
  );

  const actionCreator: ActionCreator = {
    close: useMemo<() => void>(() => () => dispatch(CloseActionType), [dispatch]),
    open: useMemo<() => void>(() => () => dispatch(OpenActionType), [dispatch])
  };

  return Object.freeze([Object.freeze(state), actionCreator]);
}
