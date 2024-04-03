import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import style from "./Produtos.module.css"
import Card from "./Card"
import ActionButton from './ActionButton';
import { hamburguersData } from './hamburguersData';


const Produtos = () => {
    const [produtos, setProdutos] = useState(hamburguersData)

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