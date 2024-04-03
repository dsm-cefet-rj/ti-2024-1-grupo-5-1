import React from 'react';
import { useSelector } from "react-redux";

import Card from "./Card"
import ActionButton from './ActionButton';

import 'bootstrap/dist/css/bootstrap.css';
import style from "./Produtos.module.css"

import { fetchProdutos } from '../../redux/reducers/produtosSlice';
import store from '../../redux/store';

store.dispatch(fetchProdutos())

const Produtos = () => {
    const produtos = useSelector(state => state.produtos.itens)
    return (
        <>
            <div className={`container ${style.topSpace}`}>
                <div>Hamburguers</div>
                <div className='row row-cols-auto justify-content-center'>
                    {
                        produtos.map(produto => (
                            <div key={produto.id} className='col mb-3'>
                                <Card item={produto}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <ActionButton/>
        </>
    )
}

export default Produtos