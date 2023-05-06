import { css, cx } from '@emotion/css';
import { memo, useEffect, useMemo, useRef } from 'react';
import { messagePortRPC } from 'message-port-rpc';

import useCloseCallback from './FloatingPopover/useCloseCallback';
import useOpened from './FloatingPopover/useOpened';

import type { ClosePopoverCallback } from '../../common/types/ClosePopoverCallback';
import type { FocusSendBoxCallback } from '../../common/types/FocusSendBoxCallback';
import type { IFrameSetupMessage } from '../../common/types/IFrameSetupMessage';

const ROOT_CSS = css({
  '&.floating-web-chat': {
    border: 0,
    height: '100%',
    width: '100%'
  }
});

const WebChatIFrame = memo(() => {
  const [opened] = useOpened();
  const close = useCloseCallback();
  const focusSendBoxCallbackRef = useRef<FocusSendBoxCallback | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useMemo(() => opened && focusSendBoxCallbackRef.current?.(), [focusSendBoxCallbackRef, opened]);

  useEffect(() => {
    const { current: iframe } = iframeRef;

    if (!iframe) {
      return;
    }

    const { port1: closePopoverPort1, port2: closePopoverPort2 } = new MessageChannel();
    const { port1: focusSendBoxPort1, port2: focusSendBoxPort2 } = new MessageChannel();

    messagePortRPC<ClosePopoverCallback>(closePopoverPort1, () => Promise.resolve(close()));
    focusSendBoxCallbackRef.current = messagePortRPC<FocusSendBoxCallback>(focusSendBoxPort1);

    const handleLoad = () => {
      const setupMessage: IFrameSetupMessage = {
        closePopoverPort: closePopoverPort2,
        focusSendBoxPort: focusSendBoxPort2
      };

      // Only post to same origin.
      iframe.contentWindow?.postMessage(setupMessage, location.origin, [closePopoverPort2, focusSendBoxPort2]);
    };

    iframe.addEventListener('load', handleLoad);

    return () => {
      closePopoverPort1.close();
      closePopoverPort2.close();

      focusSendBoxPort1.close();
      focusSendBoxPort2.close();

      iframe.removeEventListener('load', handleLoad);
    };
  }, [close, focusSendBoxCallbackRef, iframeRef]);

  return <iframe className={cx(ROOT_CSS, 'floating-web-chat')} ref={iframeRef} src="./embed.html" title="Web Chat" />;
});

export default WebChatIFrame;
