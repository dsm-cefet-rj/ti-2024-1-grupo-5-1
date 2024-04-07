import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../redux/reducers/authSlice';
import { Alert } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handlePasswordToggle = (e) => {
        e.preventDefault();
        setShowPassword((state) => !state);
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, status } = useSelector(state => state.auth);
    console.log(user, status);

    useEffect(() => {
        if(status === 'success') {
            navigate('/produtos');
        }

        if(status === 'failed') {
            setErrorMessage('Usuário ou senha incorretos.');
        }

        dispatch(reset())
    }, [user, status, navigate, dispatch]);

    const onSubmit = async(e) => {
        e.preventDefault();
        
        try {
            await dispatch(login( { email, password } ));
        } catch (error) {
            console.log('Erro ao efetuar login: ', error.message);
        }
    }

        return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={onSubmit}>
                    {errorMessage && <Alert key="danger" variant="danger">{errorMessage}</Alert>}
                    <div className="mb-3">
                        <label htmlFor="input-email" className="form-label">E-mail</label>
                        <input 
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}>    
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input-password" className="form-label">Senha</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="show-password"
                            onChange={handlePasswordToggle}>                            
                        </input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Mostrar senha</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Acessar</button>
                </form>
            </div>
        </>
    )
}

export default Login;