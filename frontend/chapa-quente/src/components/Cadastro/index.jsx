import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';


function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [mostarSenha, setMostrarSenha] = useState(false);
    
    function handleSubmit(event) {
        event.preventDefault();
        console.log(email, senha);
    }

    return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="input-email" className="form-label">E-mail</label>
                        <input 
                            type="email"
                            className="form-control"
                            id="input-email"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={e => setEmail(e.target.value)}>    
                        </input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input-password" className="form-label">Senha</label>
                        <input
                            type={mostarSenha ? 'text' : 'password'}
                            className="form-control"
                            id="input-password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}>
                        </input>
                    </div>
                    <div className="mb-3 form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            onChange={() => setMostrarSenha(!mostarSenha)}>                            
                        </input>
                        <label className="form-check-label" htmlFor="exampleCheck1">Mostrar senha</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Fazer Cadastro</button>
                </form>
            </div>
        </>
    )
}

export default Cadastro;