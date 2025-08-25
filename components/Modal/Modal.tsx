import css from './Modal.module.css';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import * as React from 'react';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onEsc);
    };
  }, [closeModal]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      role='dialog'
      aria-modal='true'
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
