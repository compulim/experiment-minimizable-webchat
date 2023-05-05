import { css, cx } from '@emotion/css';
import { memo } from 'react';
import { wrapWith } from 'react-wrap-with';

import FloatingLayer from './FloatingLayer';
import FloatingDialogProvider from './providers/FloatingDialog/FloatingDialogProvider';
import useOpened from './providers/FloatingDialog/useOpened';
import useCloseCallback from './providers/FloatingDialog/useCloseCallback';
import useOpenCallback from './providers/FloatingDialog/useOpenCallback';

const ROOT_CSS = css({
  '&.floating-web-chat': {
    border: 0,
    height: '100%',
    width: '100%'
  }
});

const FloatingWebChat = memo(() => {
  const [opened] = useOpened();
  const handleClose = useCloseCallback();
  const handleOpen = useOpenCallback();

  console.log({ opened });

  return (
    <FloatingLayer open={opened} hasNotification={false} onClose={handleClose} onOpen={handleOpen}>
      <iframe className={cx(ROOT_CSS, 'floating-web-chat')} src="./embed.html" title="Web Chat" />
    </FloatingLayer>
  );
});

export default memo(wrapWith(FloatingDialogProvider)(FloatingWebChat));
