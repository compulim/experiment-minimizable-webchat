import './Dialog.css';

import { memo, useEffect, useRef } from 'react';

import useCloseCallback from '../useCloseCallback';
import useInitialized from '../useInitialized';
import useOpened from '../useOpened';
import usePrevious from '../../../../common/hooks/internal/usePrevious';

import type { ReactNode } from 'react';

const FloatingPopoverDialog = memo(({ children }: { children?: ReactNode }) => {
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

  // TODO: When closing popover, it should focus on last focus.

  return (
    <dialog className="floating-layer__dialog ms-depth-8" onClose={handleClose} ref={dialogRef}>
      {initialized ? children : null}
    </dialog>
  );
});

export default FloatingPopoverDialog;
