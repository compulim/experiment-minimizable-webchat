import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useOpened(): readonly [boolean] {
  return useFloatingDialogContext().openedState;
}
