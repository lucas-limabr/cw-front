import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [usuario, setUsuario] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const login = localStorage.getItem("login");
        if (token) {
            setIsLoggedIn(true);
            setUsuario(login);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);
        try {
            const response = await axios.post("http://localhost:8080/api/v1/usuarios/auth", {
                login,
                senha,
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("roles", JSON.stringify(response.data.roles));
            localStorage.setItem("login", response.data.login);

            setIsLoggedIn(true);
            setUsuario(response.data.login);
            navigate("/"); // redireciona pra home ou outro local
        } catch (err) {
            setErro("Login ou senha inválidos");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUsuario("");
        navigate("/login");
    };

    if (isLoggedIn) {
        return (
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4 shadow-lg text-center" style={{ minWidth: "350px", maxWidth: "400px" }}>
                    <h4 className="mb-3">Você está logado como <strong>{usuario}</strong></h4>
                    <button onClick={handleLogout} className="btn btn-danger w-100">
                        Logout
                    </button>
                    <div className="mt-3">
                        <small className="text-muted">© 2025 - ConcessWeb</small>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ minWidth: "350px", maxWidth: "400px" }}>
                <h2 className="text-center mb-4">Login</h2>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="login" className="form-label">Usuário</label>
                        <input
                            type="text"
                            className="form-control"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            placeholder="Digite seu usuário"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Entrar
                    </button>
                </form>
                <div className="mt-3 text-center">
                    <small className="text-muted">© 2025 - ConcessWeb</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
