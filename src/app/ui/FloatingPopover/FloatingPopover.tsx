import './FloatingPopover.css';

import { memo } from 'react';

import FloatingPopoverButton from './private/Button';
import FloatingPopoverDialog from './private/Dialog';
import FloatingPopoverProvider from './private/Provider';

import type { ReactNode } from 'react';

const FloatingPopover = memo(({ children }: { children?: ReactNode }) => {
  return (
    <FloatingPopoverProvider>
      <div className="webchat__floating-popover">
        <FloatingPopoverButton />
        <FloatingPopoverDialog>{children}</FloatingPopoverDialog>
      </div>
    </FloatingPopoverProvider>
  );
});

export default FloatingPopover;
