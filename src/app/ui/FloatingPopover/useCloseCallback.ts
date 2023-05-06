import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useCloseCallback(): () => void {
  return useFloatingPopoverContext().closeCallback;
}
