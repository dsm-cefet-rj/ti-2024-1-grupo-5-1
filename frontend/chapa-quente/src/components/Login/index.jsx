import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);



    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, senha);
    }

    const navigate = useNavigate();
    useEffect(() => {
        if (isError) {
            <Alert key="danger" variant="danger">
                Usuário ou senha incorretos!
            </Alert>
        }

        if (isSuccess || user) {
            navigate('/produtos');
        } 
    }, [isError, isSuccess, user, navigate]);
    
    
    return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)}></input>
                        <div id="emailHelp" className="form-text">Nunca compartilharemos seu e-mail com mais ninguém.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={senha} onChange={e => setSenha(e.target.value)}></input>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" onChange={() => setMostrarSenha(!mostrarSenha)}></input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Mostrar senha</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </form>
            </div>
        
        </>    
    )
}

export default Login;