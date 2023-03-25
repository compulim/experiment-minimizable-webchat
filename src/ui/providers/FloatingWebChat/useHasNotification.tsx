import useFloatingWebChatContext from './private/useFloatingWebChatContext';

export default function useHasNotification(): readonly [boolean] {
  return useFloatingWebChatContext().hasNotificationState;
}
