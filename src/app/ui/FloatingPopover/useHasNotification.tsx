import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useHasNotification(): readonly [boolean] {
  return useFloatingPopoverContext().hasNotificationState;
}
