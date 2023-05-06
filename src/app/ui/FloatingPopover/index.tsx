import './index.css';

import FloatingDialogProvider from '../providers/FloatingDialog/FloatingDialogProvider';
import FloatingPopoverButton from './Button';
import FloatingPopoverDialog from './Dialog';

import type { ReactNode } from 'react';

const FloatingPopover = ({ children }: { children?: ReactNode }) => {
  return (
    <FloatingDialogProvider>
      <div className="webchat__floating-popover">
        <FloatingPopoverButton />
        <FloatingPopoverDialog>{children}</FloatingPopoverDialog>
      </div>
    </FloatingDialogProvider>
  );
};

export default FloatingPopover;
