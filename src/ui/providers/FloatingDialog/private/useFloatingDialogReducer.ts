import { useEffect, useMemo, useReducer } from 'react';

const CloseActionType = Symbol('CLOSE');
const NotifyActionType = Symbol('NOTIFY');
const OpenActionType = Symbol('OPEN');

type Action = typeof CloseActionType | typeof NotifyActionType | typeof OpenActionType;

type State = {
  hasNotification: boolean;
  initializing?: true;
  opened: boolean;
  token?: string;
};

type ActionCreator = {
  close: () => void;
  notify: () => void;
  open: () => void;
};

export default function useFloatingDialogReducer(): readonly [Readonly<State>, ActionCreator] {
  const abortController = useMemo(() => new AbortController(), []);

  useEffect(() => () => abortController.abort(), [abortController]);

  const [state, dispatch] = useReducer(
    (state: Readonly<State>, action: Action) => {
      if (action === CloseActionType) {
        state = { ...state, opened: false };
      } else if (action === NotifyActionType) {
        state = state.opened ? state : { ...state, hasNotification: true };
      } else if (action === OpenActionType) {
        state = { ...state, hasNotification: false, opened: true };
      }

      return state;
    },
    { hasNotification: false, opened: false }
  );

  const actionCreator: ActionCreator = {
    close: useMemo<() => void>(() => () => dispatch(CloseActionType), [dispatch]),
    open: useMemo<() => void>(() => () => dispatch(OpenActionType), [dispatch]),
    notify: useMemo<() => void>(() => () => dispatch(NotifyActionType), [dispatch])
  };

  return Object.freeze([Object.freeze(state), actionCreator]);
}
