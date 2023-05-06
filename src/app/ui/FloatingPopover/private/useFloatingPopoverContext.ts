import { useContext } from 'react';

import FloatingPopoverContext from './Context';

export default function useFloatingPopoverContext() {
  return useContext(FloatingPopoverContext);
}
