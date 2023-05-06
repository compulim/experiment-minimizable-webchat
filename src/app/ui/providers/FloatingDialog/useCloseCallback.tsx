import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useCloseCallback(): () => void {
  return useFloatingDialogContext().closeCallback;
}
