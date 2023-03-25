import { useContext } from 'react';

import FloatingWebChatContext from './FloatingWebChatContext';

export default function useFloatingWebChatContext() {
  return useContext(FloatingWebChatContext);
}
