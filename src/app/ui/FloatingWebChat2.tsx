import { memo } from 'react';

import WebChatIFrame from './WebChatIFrame';
import FloatingPopover from './FloatingPopover';

const FloatingWebChat = memo(() => {
  return (
    <FloatingPopover>
      <WebChatIFrame />
    </FloatingPopover>
  );
});

export default FloatingWebChat;
