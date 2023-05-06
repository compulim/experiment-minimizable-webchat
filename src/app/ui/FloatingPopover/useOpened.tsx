import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useOpened(): readonly [boolean] {
  return useFloatingPopoverContext().openedState;
}
