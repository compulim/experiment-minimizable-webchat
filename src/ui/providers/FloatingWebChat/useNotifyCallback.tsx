import useFloatingWebChatContext from './private/useFloatingWebChatContext';

export default function useNotifyCallback(): () => void {
  return useFloatingWebChatContext().notifyCallback;
}
