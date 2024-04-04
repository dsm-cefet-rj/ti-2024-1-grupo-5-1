import 'bootstrap/dist/css/bootstrap.css';
import './login.css';

function Login() {
    return (
        <>
            <div className="login-form d-flex justify-content-center align-items-center">
                <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                    <div className="mb-3">
                        <label htmlfor="exampleInputEmail1" className="form-label">E-mail</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlfor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"></input>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"></input>
                        <label className="form-check-label" hmtlfor="exampleCheck1">Lembrar minha sessão</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;