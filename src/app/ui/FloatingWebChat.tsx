import { memo } from 'react';

import FloatingPopover from './FloatingPopover/FloatingPopover';
import WebChatIFrame from './WebChatIFrame';

const FloatingWebChat = memo(() => {
  return (
    <FloatingPopover>
      <WebChatIFrame />
    </FloatingPopover>
  );
});

export default FloatingWebChat;
