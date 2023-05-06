import { css, cx } from '@emotion/css';
import { memo, useEffect, useMemo, useRef } from 'react';
import { messagePortRPC } from 'message-port-rpc';

import useNotifyCallback from './FloatingPopover/useNotifyCallback';

import type { IFrameSetupMessage } from '../../common/types/IFrameSetupMessage';
import { FocusCallback } from '../../common/types/FocusCallback';
import { NotifyCallback } from '../../common/types/NotifyCallback';
import useOpened from './FloatingPopover/useOpened';

const ROOT_CSS = css({
  '&.floating-web-chat': {
    border: 0,
    height: '100%',
    width: '100%'
  }
});

const WebChatIFrame = memo(() => {
  const [opened] = useOpened();
  const focusCallbackRef = useRef<FocusCallback | null>(null);
  const handleNotify = useNotifyCallback();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useMemo(() => opened && focusCallbackRef.current?.(), [focusCallbackRef, opened]);

  useEffect(() => {
    const { current: iframe } = iframeRef;

    if (!iframe) {
      return;
    }

    const { port1: focusPort1, port2: focusPort2 } = new MessageChannel();
    const { port1: notifyPort1, port2: notifyPort2 } = new MessageChannel();

    messagePortRPC<NotifyCallback>(notifyPort1, () => Promise.resolve(handleNotify()));
    focusCallbackRef.current = messagePortRPC<FocusCallback>(focusPort1);

    const handleLoad = () => {
      const setupMessage: IFrameSetupMessage = { focusPort: focusPort2, notifyPort: notifyPort2 };

      // Only post to same origin.
      iframe.contentWindow?.postMessage(setupMessage, location.origin, [focusPort2, notifyPort2]);
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      notifyPort1.close();
      notifyPort2.close();

      iframe.removeEventListener('load', handleLoad);
    };
  }, [focusCallbackRef, handleNotify, iframeRef]);

  return <iframe className={cx(ROOT_CSS, 'floating-web-chat')} ref={iframeRef} src="./embed.html" title="Web Chat" />;
});

export default WebChatIFrame;
