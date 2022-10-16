import React, { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  children,
  isOpen,
  onConfirm,
  onCancel
}) => {
  const nodeRef = useRef(null);
  const [opened, setOpened] = useState(false);

  const cancel = () => {
    onCancel();
    setOpened(false);
  };

  const confirm = () => {
    onConfirm();
    setOpened(false);
  };

  useEffect(() => {
    setOpened(isOpen);
  }, [isOpen]);

  return (
    
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpen}
        timeout={100}
        className="modal"
      >
        <>
          {opened &&
            <div className="modal" ref={nodeRef}>
              <button className="close" onClick={cancel}>
                &times;
              </button>
              <div className="header">{title}</div>
              <div className="content">
                {children}
              </div>
              <div className="actions">
                <button className="button" onClick={cancel}>
                  Cancel
                </button>
                <button className="button" onClick={confirm}>
                  OK
                </button>
              </div>
            </div>
          }
        </>
      </CSSTransition>
    
  );
};