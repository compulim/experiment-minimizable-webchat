import useFloatingWebChatContext from './private/useFloatingWebChatContext';

export default function useOpened(): readonly [boolean] {
  return useFloatingWebChatContext().openedState;
}
