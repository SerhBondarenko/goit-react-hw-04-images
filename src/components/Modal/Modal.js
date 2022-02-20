import {useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "../Modal/Modal.module.css";
const modalRoot = document.querySelector("#modal-root");

export default function Modal(props) {
  useEffect(() => {
    console.log("start useEffect");
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  },);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
     props.onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      props.onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>{props.children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string
};