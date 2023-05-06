import { memo, useMemo } from 'react';

import FloatingDialogContext from './private/FloatingDialogContext';
import useFloatingDialogReducer from './private/useFloatingDialogReducer';

import type { FloatingDialogContextType } from './private/FloatingDialogContext';
import type { ReactNode } from 'react';

type Props = { children?: ReactNode };

const FloatingDialogProvider = memo(({ children }: Props) => {
  const [{ hasNotification, initialized, opened }, { close, open, notify }] = useFloatingDialogReducer();

  const hasNotificationState = useMemo<readonly [boolean]>(() => Object.freeze([hasNotification]), [hasNotification]);
  const initializedState = useMemo<readonly [boolean]>(() => Object.freeze([initialized]), [initialized]);
  const openedState = useMemo<readonly [boolean]>(() => Object.freeze([opened]), [opened]);

  const context = useMemo<FloatingDialogContextType>(
    () => ({
      closeCallback: close,
      hasNotificationState,
      initializedState,
      notifyCallback: notify,
      openCallback: open,
      openedState
    }),
    [close, openedState, hasNotificationState, notify, open]
  );

  return <FloatingDialogContext.Provider value={context}>{children}</FloatingDialogContext.Provider>;
});

export default FloatingDialogProvider;
