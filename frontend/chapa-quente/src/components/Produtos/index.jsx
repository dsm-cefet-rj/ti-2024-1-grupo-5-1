import React, { useEffect } from 'react';
import { useSelector,  useDispatch } from "react-redux";

import Card from "./Card"
import ActionButton from './ActionButton';

import 'bootstrap/dist/css/bootstrap.css';
import style from "./Produtos.module.css"

import { fetchProdutos } from '../../redux/reducers/produtosSlice';
import { selectAllProdutos } from '../../redux/reducers/produtosSlice';

const Produtos = () => {
    const dispatch = useDispatch()
    const produtos = useSelector(selectAllProdutos)
    const produtosStatus = useSelector(state => state.produtos.status)

    useEffect(() => {
        if (produtosStatus === 'idle'){
            dispatch(fetchProdutos())
        }
    }, [produtosStatus, dispatch])

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