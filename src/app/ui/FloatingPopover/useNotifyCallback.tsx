import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useNotifyCallback(): () => void {
  return useFloatingPopoverContext().notifyCallback;
}
