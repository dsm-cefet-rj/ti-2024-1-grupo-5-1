import React from "react";
import { Link } from "react-router-dom";
import style from './actionButton.module.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector } from "react-redux";

const ActionButton = () => {
    const carrinhoItens = useSelector(state => state.carrinho.itens);

    // Calcula a quantidade total de itens no carrinho
    const quantidadeTotal = carrinhoItens.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <Link to='/pedidos'>
                <div className={style.wrapper}>
                    <i className={`bi bi-cart ${style.iconSize}`} style={{ fontSize: `65px` }}></i>
                    <div className={style.textWrapper}>{quantidadeTotal}</div>
                </div>
            </Link>
        </>
    );
}

export default ActionButton;
