import 'react-toastify/dist/ReactToastify.css';

import {ToastContainer} from 'react-toastify'
import Header from './components/Header'
import Footer from './components/Footer'
import Router from './components/Router'

import "./App.css"

const App = () => {
    return (
        <>
            <Header />
            <Router/>
            <ToastContainer/>
            <Footer />
        </>
    )
}

export default App;