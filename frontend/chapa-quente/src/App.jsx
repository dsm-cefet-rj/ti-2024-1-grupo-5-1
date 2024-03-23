import Header from './components/Header'
import Footer from './components/Footer'
import Produtos from './components/Produtos'

import "./App.css"

const App = () => {
    return (
        <>
            <div className='App'>
                <Header />
                <Produtos />
                <Footer />
            </div>
        </>
    )
}

export default App;