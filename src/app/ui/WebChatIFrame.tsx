import { css, cx } from '@emotion/css';
import { memo, useEffect, useRef } from 'react';
import { messagePortRPC } from 'message-port-rpc';

import useNotifyCallback from './FloatingPopover/useNotifyCallback';

import type { IFrameSetupMessage } from '../../common/types/IFrameSetupMessage';

const ROOT_CSS = css({
  '&.floating-web-chat': {
    border: 0,
    height: '100%',
    width: '100%'
  }
});

const WebChatIFrame = memo(() => {
  const handleNotify = useNotifyCallback();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const { current: iframe } = iframeRef;

    if (!iframe) {
      return;
    }

    const { port1, port2 } = new MessageChannel();

    messagePortRPC(port1, handleNotify);

    const handleLoad = () => {
      const setupMessage: IFrameSetupMessage = { notifyPort: port2 };

      // Only post to same origin.
      iframe.contentWindow?.postMessage(setupMessage, location.origin, [port2]);
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      port1.close();
      port2.close();

      iframe.removeEventListener('load', handleLoad);
    };
  }, [iframeRef]);

  return <iframe className={cx(ROOT_CSS, 'floating-web-chat')} ref={iframeRef} src="./embed.html" title="Web Chat" />;
});

export default WebChatIFrame;
