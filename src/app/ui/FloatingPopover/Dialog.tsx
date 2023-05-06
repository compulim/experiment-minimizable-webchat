import './Dialog.css';

import { useEffect, useRef } from 'react';

import useCloseCallback from '../providers/FloatingDialog/useCloseCallback';
import useInitialized from '../providers/FloatingDialog/useInitialized';
import useOpened from '../providers/FloatingDialog/useOpened';
import usePrevious from '../hooks/internal/usePrevious';

import type { ReactNode } from 'react';

const FloatingPopoverDialog = ({ children }: { children?: ReactNode }) => {
  const [initialized] = useInitialized();
  const [opened] = useOpened();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleClose = useCloseCallback();

  const previousOpened = usePrevious(opened);

  useEffect(() => {
    const { current } = dialogRef;

    if (current && previousOpened !== opened) {
      opened ? current.show() : current.close();
    }
  }, [dialogRef, opened, previousOpened]);

  return (
    <dialog className="floating-layer__dialog ms-depth-8" onClose={handleClose} ref={dialogRef}>
      {initialized ? children : null}
    </dialog>
  );
};

export default FloatingPopoverDialog;
