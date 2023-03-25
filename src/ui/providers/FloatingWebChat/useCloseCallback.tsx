import useFloatingWebChatContext from './private/useFloatingWebChatContext';

export default function useCloseCallback(): () => void {
  return useFloatingWebChatContext().closeCallback;
}
