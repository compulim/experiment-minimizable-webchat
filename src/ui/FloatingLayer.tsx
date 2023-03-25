import { css, cx } from '@emotion/css';
import { memo, PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useRefFrom } from 'use-ref-from';
import usePrevious from './hooks/internal/usePrevious';

const ROOT_CSS = css({
  '&.floating-layer': {
    bottom: 'var(--body-margin)',
    display: 'flex',
    flexDirection: 'column-reverse',
    gap: 'var(--gap)',
    position: 'fixed',
    right: 'var(--body-margin)',

    '--body-margin': '20px',
    '--button-color': '#0078d4',
    '--button-size': '60px',
    '--gap': '20px',
    '--notification-dot-color': 'red',
    '--notification-dot-size': '16px'
  },

  '& .floating-layer__button': {
    alignSelf: 'flex-end',
    appearance: 'none',
    backgroundColor: 'var(--button-color)',
    border: 0,
    borderRadius: '50%',
    height: 60,
    padding: 0,
    position: 'relative',
    width: 60
  },

  '& .floating-layer__dialog': {
    appearance: 'none',
    backgroundColor: '#f7f7f7',
    border: 0,
    borderRadius: 4,
    boxSizing: 'border-box',
    height: 'calc(100vh - var(--button-size) - var(--gap) - var(--body-margin) * 2)',
    overflow: 'hidden',
    padding: 0,
    position: 'unset',
    width: 320
  },

  '& .floating-layer__button-icon': {
    color: 'white',
    fontSize: 32
  },

  '& .floating-layer__notification-dot': {
    backgroundColor: 'var(--notification-dot-color)',
    borderRadius: '50%',
    height: 'var(--notification-dot-size)',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 'var(--notification-dot-size)'
  }
});

type Props = PropsWithChildren<{
  dialogClassName?: string;
  hasNotification?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  open?: boolean;
}>;

const FloatingLayer = memo(({ children, dialogClassName, hasNotification, onClose, onOpen, open }: Props) => {
  const openRef = useRefFrom(open);
  const previousOpen = usePrevious(open);

  const handleButtonClick = useCallback(() => (openRef.current ? onClose?.() : onOpen?.()), [openRef]);
  const handleClose = useCallback(() => onClose?.(), [onClose]);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const { current } = dialogRef;

    if (previousOpen !== open) {
      open ? current?.show?.() : current?.close?.();
    }
  }, [dialogRef, open, previousOpen]);

  return (
    <div className={cx('floating-layer', ROOT_CSS)}>
      <button
        className="floating-layer__button ms-depth-8"
        onClick={handleButtonClick}
        title="Chat with us"
        type="button"
      >
        <i aria-hidden="true" className="floating-layer__button-icon ms-Icon ms-Icon--ChatBot" />
        {!!hasNotification && <div className="floating-layer__notification-dot" />}
      </button>
      <dialog
        className={cx('floating-layer__dialog ms-depth-8', dialogClassName)}
        onClose={handleClose}
        ref={dialogRef}
      >
        {children}
      </dialog>
    </div>
  );
});

export default FloatingLayer;
