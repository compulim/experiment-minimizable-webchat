import { createRoot } from 'react-dom/client';
import { messagePortRPC } from 'message-port-rpc';

import { IFrameSetupMessage } from '../common/types/IFrameSetupMessage';
import App from './ui/App';

import type { NotifyCallback } from '../common/types/NotifyCallback';

window.addEventListener(
  'message',
  ({ data }: MessageEvent<IFrameSetupMessage>) => {
    const rootElement = document.getElementsByTagName('main')[0];

    const handleNotify = messagePortRPC<NotifyCallback>(data.notifyPort);

    rootElement && createRoot(rootElement).render(<App onNotify={handleNotify} />);
  },
  { once: true }
);
