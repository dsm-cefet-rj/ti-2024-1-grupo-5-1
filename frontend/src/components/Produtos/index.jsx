import React, { useEffect } from 'react';
import { useSelector,  useDispatch } from "react-redux";

import Card from "./Card"
import OffscreenCart from './OffscreenCart';

import 'bootstrap/dist/css/bootstrap.css';
import style from "./Produtos.module.css"

import { selectAllProdutos , fetchProdutos , selectProduto } from '../../redux/reducers/produtosSlice';

const Produtos = () => {
    const dispatch = useDispatch()
    const produtos = useSelector(selectAllProdutos)
    const produtosStatus = useSelector(state => state.produtos.status)

    useEffect(() => {
        if (produtosStatus === 'idle'){
            dispatch(fetchProdutos())
        }
    }, [produtosStatus, dispatch])

    if (produtos.length === 0) {
        return (
          <div style={{ maxWidth: '500px', margin: '0 auto', marginTop: '55px' }}>
            <h4 className="text-center mb-2">Nenhum produto encontrado!</h4>
          </div>
        );
      }

    return (
        <>
            <div className={`container ${style.topSpace}`}>
                <div className='row row-cols-auto justify-content-center'>
                    {
                        produtos.map(produto => (
                            <div key={produto._id} className='col mb-3'>
                                <Card item={produto}/>
                            </div>
                        ))
                    }
                </div>
            </div>
            <OffscreenCart/>
        </>
    )
}

export default Produtos