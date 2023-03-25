import { createDirectLine } from 'botframework-webchat';
import { memo, useMemo } from 'react';

import FloatingWebChatContext from './private/FloatingWebChatContext';
import useFloatingWebChatReducer from './private/useFloatingWebChatReducer';

import type { FloatingWebChatContextType } from './private/FloatingWebChatContext';
import type { ReactNode } from 'react';

type DirectLine = ReturnType<typeof createDirectLine>;

type Props = { children?: ReactNode };

const FloatingWebChatProvider = memo(({ children }: Props) => {
  const [{ directLine, hasNotification, opened }, { close, open, notify }] = useFloatingWebChatReducer();

  const directLineState = useMemo<readonly [DirectLine | undefined]>(() => Object.freeze([directLine]), [directLine]);
  const hasNotificationState = useMemo<readonly [boolean]>(() => Object.freeze([hasNotification]), [hasNotification]);
  const openedState = useMemo<readonly [boolean]>(() => Object.freeze([opened]), [opened]);

  const context = useMemo<FloatingWebChatContextType>(
    () => ({
      closeCallback: close,
      directLineState,
      hasNotificationState,
      notifyCallback: notify,
      openCallback: open,
      openedState
    }),
    [close, openedState, directLineState, hasNotificationState, notify, open]
  );

  return <FloatingWebChatContext.Provider value={context}>{children}</FloatingWebChatContext.Provider>;
});

export default FloatingWebChatProvider;
