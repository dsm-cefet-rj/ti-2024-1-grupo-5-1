import React, { useState } from "react";
import style from './actionButton.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const ActionButton = ({quantity}) => {
    return (
        <>
            <div className={style.wrapper}>
                <i className={`bi bi-cart ${style.iconSize}`} style={{ fontSize: `65px`}}></i>
                <div className={style.textWrapper}>{quantity}</div>
            </div>
        </>
    );
}

export default ActionButton