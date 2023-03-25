import useFloatingWebChatContext from './private/useFloatingWebChatContext';

export default function useOpenCallback(): () => void {
  return useFloatingWebChatContext().openCallback;
}
