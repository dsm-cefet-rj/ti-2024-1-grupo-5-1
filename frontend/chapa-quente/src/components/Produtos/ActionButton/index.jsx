import React from "react";
import { Link } from "react-router-dom";
import style from './actionButton.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";

const ActionButton = () => {
    const state = useSelector(state => state.carrinho)

    return (
        <>
            <Link to='/pedidos'>
                <div className={style.wrapper}>
                    <i className={`bi bi-cart ${style.iconSize}`} style={{ fontSize: `65px` }}></i>
                    <div className={style.textWrapper}>{state.itens.length}</div>
                </div>
            </Link>
        </>
    );
}

export default ActionButton