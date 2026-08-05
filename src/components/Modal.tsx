import classes from './Modal.module.css';
import { ReactNode } from 'react';

export interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog className={classes.modal} open>
        {children}
      </dialog>
    </>
  )
}

export default Modal;
