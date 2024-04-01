import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import style from './actionButton.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";

const ActionButton = ({ quantity }) => {
    return (
        <>
            <Link to='/pedidos'>
                <div className={style.wrapper}>
                    <i className={`bi bi-cart ${style.iconSize}`} style={{ fontSize: `65px` }}></i>
                    <div className={style.textWrapper}>{quantity}</div>
                </div>
            </Link>
        </>
    );
}

export default ActionButton