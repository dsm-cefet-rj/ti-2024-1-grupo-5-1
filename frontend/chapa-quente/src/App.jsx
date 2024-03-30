import Header from './components/Header'
import Footer from './components/Footer'
import Produtos from './components/Produtos'
import React, {useState} from 'react'
import "./App.css"

const App = () => {
    const [carrinho, setCarrinho] = useState([])
    const [quantity, setQuantity] = useState(0)

    function handleAddCarrinho(item){
        setCarrinho([...carrinho, item])
        setQuantity(quantity+1)
    }

    function handleRemoveCarrinho(item) {
        if (carrinho.length > 0){
            var newCarrinho = carrinho
            const indexs = carrinho.map((itemCarrinho) => itemCarrinho.id)
            const indexToRemove = indexs.lastIndexOf(item.id)
            newCarrinho.splice(indexToRemove, 1)
            setCarrinho(newCarrinho)
            setQuantity(quantity-1)
        }
    }

    return (
        <>
            <div className='App'>
                <Header />
                <Produtos quantity={quantity} handleAddCarrinho = {handleAddCarrinho} handleRemoveCarrinho = {handleRemoveCarrinho}/>
                <Footer />
            </div>
        </>
    )
}

export default App;