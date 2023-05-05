import { useContext } from 'react';

import WebChatServiceContext, { type WebChatServiceContextType } from './WebChatServiceContext';

export default function useWebChatServiceContext(): WebChatServiceContextType {
  return useContext(WebChatServiceContext);
}
