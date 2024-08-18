// components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, hideCloseBtn, hideContainer, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={hideContainer ? "hidden-modal-modal" : "modal-modal"}
        onClick={(e) => e.stopPropagation()}
      >
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
