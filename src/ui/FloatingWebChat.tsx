import { css, cx } from '@emotion/css';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { wrapWith } from 'react-wrap-with';

import FloatingDialogProvider from './providers/FloatingDialog/FloatingDialogProvider';
import FloatingLayer from './FloatingLayer';
import useCloseCallback from './providers/FloatingDialog/useCloseCallback';
import useInitialized from './providers/FloatingDialog/useInitialized';
import useOpenCallback from './providers/FloatingDialog/useOpenCallback';
import useOpened from './providers/FloatingDialog/useOpened';

const ROOT_CSS = css({
  '&.floating-web-chat': {
    border: 0,
    height: '100%',
    width: '100%'
  }
});

const FloatingWebChat = memo(() => {
  const [initialized] = useInitialized();
  const [opened] = useOpened();
  const { port1, port2 } = useMemo(() => new MessageChannel(), []);
  const handleClose = useCloseCallback();
  const handleOpen = useOpenCallback();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = useCallback<(event: Event) => void>(({ currentTarget }: Event) => {
    // TODO: Fix security.
    (currentTarget as HTMLIFrameElement).contentWindow?.postMessage('Hello, World!', '*', [port2]);

    console.log('"Hello, World!" sent.');
  }, []);

  useEffect(() => {
    const { current: iframe } = iframeRef;

    // TODO: Fix this, we should not need to look at initialized.
    if (iframe && initialized) {
      iframe.addEventListener('load', handleLoad);

      return () => iframe.removeEventListener('load', handleLoad);
    }
  }, [iframeRef, initialized, handleLoad]);

  return (
    <FloatingLayer open={opened} hasNotification={false} onClose={handleClose} onOpen={handleOpen}>
      {initialized && (
        <iframe className={cx(ROOT_CSS, 'floating-web-chat')} ref={iframeRef} src="./embed.html" title="Web Chat" />
      )}
    </FloatingLayer>
  );
});

export default memo(wrapWith(FloatingDialogProvider)(FloatingWebChat));
