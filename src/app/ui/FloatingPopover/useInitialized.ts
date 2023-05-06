import useFloatingPopoverContext from './private/useFloatingPopoverContext';

export default function useInitialized(): readonly [boolean] {
  return useFloatingPopoverContext().initializedState;
}
