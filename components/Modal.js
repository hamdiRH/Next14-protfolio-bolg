// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, hideCloseBtn, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-modal" onClick={(e) => e.stopPropagation()}>
        {!hideCloseBtn && (
          <button className="modal-closeButton" onClick={onClose}>
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
