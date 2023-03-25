import { Components, hooks } from 'botframework-webchat';
import { css, cx } from '@emotion/css';
import { memo, useMemo } from 'react';
import { wrapWith } from 'react-wrap-with';

import FloatingLayer from './FloatingLayer';
import FloatingWebChatProvider from './providers/FloatingWebChat/FloatingWebChatProvider';
import useCloseCallback from './providers/FloatingWebChat/useCloseCallback';
import useDirectLine from './providers/FloatingWebChat/useDirectLine';
import useHasNotification from './providers/FloatingWebChat/useHasNotification';
import useNotifyCallback from './providers/FloatingWebChat/useNotifyCallback';
import useOpenCallback from './providers/FloatingWebChat/useOpenCallback';
import useOpened from './providers/FloatingWebChat/useOpened';
import usePrevious from './hooks/internal/usePrevious';

const { BasicWebChat, Composer } = Components;
const { useActivities } = hooks;

const ROOT_CSS = css({
  '@keyframes spin': {
    from: { transform: 'rotate(0)' },
    to: { transform: 'rotate(360deg)' }
  },

  '&.floating-web-chat': {
    '--spinner-icon-duration': '2s',
    '--spinner-icon-size': '32px'
  },

  '& .floating-web-chat__spinner-body': {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center'
  },

  '& .floating-web-chat__spinner-icon': {
    animationDuration: 'var(--spinner-icon-duration)',
    animationIterationCount: 'infinite',
    animationName: 'spin',
    animationTimingFunction: 'linear',
    fontSize: 'var(--spinner-icon-size)'
  }
});

const Initialized = wrapWith(Composer, undefined, ['directLine'])(
  memo(() => {
    const [activities] = useActivities();
    const [hasNotification] = useHasNotification();
    const [opened] = useOpened();
    const handleClose = useCloseCallback();
    const handleOpen = useOpenCallback();
    const notify = useNotifyCallback();

    const prevActivities = usePrevious(activities);

    useMemo(() => activities === prevActivities || notify(), [activities, notify, prevActivities]);

    return (
      <FloatingLayer open={opened} hasNotification={hasNotification} onClose={handleClose} onOpen={handleOpen}>
        <BasicWebChat />
      </FloatingLayer>
    );
  })
);

const Uninitialized = memo(() => {
  const [opened] = useOpened();
  const handleClose = useCloseCallback();
  const handleOpen = useOpenCallback();

  console.log({ opened });

  return (
    <FloatingLayer
      dialogClassName={cx('floating-web-chat floating-web-chat--loading', ROOT_CSS)}
      open={opened}
      hasNotification={false}
      onClose={handleClose}
      onOpen={handleOpen}
    >
      <div className="floating-web-chat__spinner-body">
        <i className="floating-web-chat__spinner-icon ms-Icon ms-Icon--ProgressRingDots" role="image" title="Loading" />
      </div>
    </FloatingLayer>
  );
});

const FloatingWebChat = memo(() => {
  const [directLine] = useDirectLine();

  return directLine ? <Initialized directLine={directLine} /> : <Uninitialized />;
});

export default memo(wrapWith(FloatingWebChatProvider)(FloatingWebChat));
