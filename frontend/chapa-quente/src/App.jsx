import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer as Toast } from 'react-toastify';
import Header from './components/Header';
import Router from './components/Router';

import Agendamento from './components/Agendamento';
import "./App.css"

const App = () => {
    return (
        <>
            <Header/>
            <Router/>
            <Toast
                position="top-center"
                autoClose={2000}
            />
        </>
    )
}

export default App;