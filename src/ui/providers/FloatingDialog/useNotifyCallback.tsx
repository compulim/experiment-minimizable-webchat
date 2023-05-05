import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useNotifyCallback(): () => void {
  return useFloatingDialogContext().notifyCallback;
}
