import './Button.css';

import { useCallback } from 'react';
import { useRefFrom } from 'use-ref-from';

import useCloseCallback from '../useCloseCallback';
import useOpenCallback from '../useOpenCallback';
import useOpened from '../useOpened';

const FloatingPopoverButton = () => {
  const [opened] = useOpened();
  const close = useCloseCallback();
  const open = useOpenCallback();

  const openedRef = useRefFrom(opened);

  const handleButtonClick = useCallback(() => (openedRef.current ? close() : open()), [openedRef]);

  return (
    <button
      className="webchat__floating-popover__button ms-depth-8"
      onClick={handleButtonClick}
      title="Chat with us"
      type="button"
    >
      <i aria-hidden="true" className="webchat__floating-popover__button-icon ms-Icon ms-Icon--ChatBot" />
    </button>
  );
};

export default FloatingPopoverButton;
