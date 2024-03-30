import Header from './components/Header'
import Footer from './components/Footer'
import Router from './components/Router'

import "./App.css"

const App = () => {
    return (
        <>
            <div className='App'>
                <Header />
                <Router/>
                <Footer />
            </div>
        </>
    )
}

export default App;