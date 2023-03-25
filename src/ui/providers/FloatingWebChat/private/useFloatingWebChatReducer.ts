import { createDirectLine } from 'botframework-webchat';
import { useEffect, useMemo, useReducer } from 'react';

const CloseActionType = Symbol('CLOSE');
const NotifyActionType = Symbol('NOTIFY');
const OpenActionType = Symbol('OPEN');
const SetTokenActionType = Symbol('SET_TOKEN');

type SetTokenAction = { payload: string; type: typeof SetTokenActionType };

type Action = typeof CloseActionType | typeof NotifyActionType | typeof OpenActionType | SetTokenAction;

type DirectLine = ReturnType<typeof createDirectLine>;

type State = {
  directLine?: DirectLine;
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

export default function useFloatingWebChatReducer(): readonly [Readonly<State>, ActionCreator] {
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

        if (!state.initializing && !state.token) {
          state = { ...state, initializing: true };

          (async function () {
            const res = await fetch('https://webchat-mockbot.azurewebsites.net/directline/token', {
              method: 'POST',
              signal: abortController.signal
            });

            res.ok && dispatch({ payload: (await res.json()).token, type: SetTokenActionType });
          })();
        }
      } else if (action.type === SetTokenActionType) {
        const { payload: token } = action;

        state = { ...state, directLine: createDirectLine({ token }), token };
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
