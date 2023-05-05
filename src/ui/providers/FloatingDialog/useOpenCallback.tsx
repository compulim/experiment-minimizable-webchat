import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useOpenCallback(): () => void {
  return useFloatingDialogContext().openCallback;
}
