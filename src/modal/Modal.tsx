import React, { useState, useRef, useEffect } from 'react';
import './modal.scss';

export const Modal: React.FC<ModalProps> = ({ onClose, children, showScroll }) => {
  const [iconScrollTop, setIconScrollTop] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef && contentRef.current) {
      const currentHeight = contentRef.current.clientHeight;
      setIconScrollTop(currentHeight ? currentHeight - 40 : 0);
    }

    const handleESC = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleESC);
    return () => {
      window.removeEventListener('keydown', handleESC);
    }
  }, [onClose]);

  function onScroll() {
    if (contentRef && contentRef.current) {
      const scrollTop = contentRef.current.scrollTop;
      if (scrollTop && scrollTop > 0) {
        setScrolled(true);
      }
      if (scrollTop === 0 && scrolled) {
        setScrolled(false)
      }
    }
  };

  const iconDownStyle = {
    top: `${iconScrollTop}px`,
  }
  return (
    <div className='modal'>
      <div className='modal-overlay' onClick={onClose} />
      <div className='modal-container' ref={contentRef} onScroll={onScroll}>
        <span className='bryan icon-close' onClick={() => onClose()} />
        <div className='content'>
          {children}
          {!scrolled && showScroll &&
            <span className='bryan icon-down' style={iconDownStyle} />
          }
        </div>
      </div>
    </div>
  )
}

interface ModalProps {
  onClose: () => void;
  showScroll: boolean;
}

interface ModalState {
  iconDownTop: number;
  scrolled: boolean;
}

export default Modal;
