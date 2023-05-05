import useFloatingDialogContext from './private/useFloatingDialogContext';

export default function useInitialized(): readonly [boolean] {
  return useFloatingDialogContext().initializedState;
}
