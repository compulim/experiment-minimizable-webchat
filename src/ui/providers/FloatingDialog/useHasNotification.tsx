import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useHasNotification(): readonly [boolean] {
  return useFloatingDialogContext().hasNotificationState;
}
