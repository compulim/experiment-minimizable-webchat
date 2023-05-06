import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useOpenCallback(): () => void {
  return useFloatingPopoverContext().openCallback;
}
