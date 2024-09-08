import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer as Toast } from 'react-toastify';
import Header from './components/Header';
import Router from './components/Router';

import { useSelector } from 'react-redux';

import "./App.css"

const App = () => {
    const { user, isLoggedIn } = useSelector((state) => state.auth);

    return (
        <>
            <Header user={user} isLoggedIn={isLoggedIn}/>
            <Router user={user} isLoggedIn={isLoggedIn}/>
            <Toast
                position="top-right"
                autoClose={1500}
                pauseOnHover={false}
            />
        </>
    )
}

export default App;