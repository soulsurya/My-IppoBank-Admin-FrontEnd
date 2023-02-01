import React from "react";

import css from "./ModalHeader.module.css";

import CloseIcon from "@material-ui/icons/Close";

const ModalHeader = (props) => {
  const { title, onModalClose } = props;
  return (
    <div>
      <div className={css.closeButtonContainer}>
        <CloseIcon onClick={onModalClose} />
      </div>
      <div className={css.header}>
        <p className={css.headerText}>
          {title}
        </p>
      </div>
    </div>
  )
}

export default ModalHeader;