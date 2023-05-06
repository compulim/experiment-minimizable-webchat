import './index.css';

import { createRoot } from 'react-dom/client';
import { messagePortRPC } from 'message-port-rpc';

import App from './ui/App';

import type { ClosePopoverCallback } from '../common/types/ClosePopoverCallback';
import type { IFrameSetupMessage } from '../common/types/IFrameSetupMessage';

window.addEventListener(
  'message',
  ({ data }: MessageEvent<IFrameSetupMessage>) => {
    const rootElement = document.getElementsByTagName('main')[0];

    const handleClosePopover = messagePortRPC<ClosePopoverCallback>(data.closePopoverPort);

    rootElement &&
      createRoot(rootElement).render(
        <App focusSendBoxPort={data.focusSendBoxPort} onClosePopover={handleClosePopover} />
      );
  },
  { once: true }
);
