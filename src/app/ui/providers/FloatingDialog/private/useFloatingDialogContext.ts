import { useContext } from 'react';

import FloatingDialogContext from './FloatingDialogContext';

export default function useFloatingDialogContext() {
  return useContext(FloatingDialogContext);
}
