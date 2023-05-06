import { memo, useMemo } from 'react';

import FloatingPopoverContext from './Context';
import useFloatingPopoverReducer from './useFloatingPopoverReducer';

import type { FloatingPopoverContextType } from './Context';
import type { ReactNode } from 'react';

type Props = { children?: ReactNode };

const FloatingDialogProvider = memo(({ children }: Props) => {
  const [{ hasNotification, initialized, opened }, { close, open, notify }] = useFloatingPopoverReducer();

  const hasNotificationState = useMemo<readonly [boolean]>(() => Object.freeze([hasNotification]), [hasNotification]);
  const initializedState = useMemo<readonly [boolean]>(() => Object.freeze([initialized]), [initialized]);
  const openedState = useMemo<readonly [boolean]>(() => Object.freeze([opened]), [opened]);

  const context = useMemo<FloatingPopoverContextType>(
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

  return <FloatingPopoverContext.Provider value={context}>{children}</FloatingPopoverContext.Provider>;
});

export default FloatingDialogProvider;
