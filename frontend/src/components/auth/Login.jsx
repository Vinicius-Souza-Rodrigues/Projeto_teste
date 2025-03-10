import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import InputsPadronizados from "../utils/InputsPadronizados";
import SubmitButtom from "../utils/SubmitButtom";

import styles from "./authCSS/Register.module.css";

function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false
    });

    const navigate = useNavigate();

    function submit(e) {
        e.preventDefault();

        setErrors({ username: false, password: false });

        if (!user.username.trim() || !user.password.trim()) {
            toast.error("Preencha todos os campos!");

            setErrors({
                username: !user.username.trim(),
                password: !user.password.trim()
            });

            return;
        }

        EnviarUser(user);
    }

    function EnviarUser(user) {
        fetch("http://localhost:8000/api/user/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((rsp) => rsp.json())
        .then(data => {
            if (data.access) {
                localStorage.setItem("token", data.access);
                toast.success("Login Bem-Sucedido!", {
                    style: { width: "205px", fontSize: "16px", padding: "10px"}
                });
                navigate("/main");
            } else {
                toast.error("Usuário ou senha inválidos!", {
                    style: { width: "250px", fontSize: "16px", padding: "10px" }
                });
                setErrors({ username: true, password: true });
            }
        })
        .catch((err) => console.log(err));
    }

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className={styles.campo}>
            <div>
                <h2>Login</h2>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputsPadronizados 
                        name="username" 
                        placeholder="Digite o seu username!" 
                        text="Nome" 
                        type="text" 
                        value={user.username} 
                        handleChange={handleOnChange} 
                        autoComplete="username"
                        hasError={errors.username}
                    />

                    <InputsPadronizados 
                        name="password" 
                        placeholder="Digite a sua senha!" 
                        text="Senha" 
                        type="password" 
                        value={user.password} 
                        handleChange={handleOnChange} 
                        autoComplete="password"
                        hasError={errors.password}
                    />
                </div>

                <div className={styles.bottom}>
                    <SubmitButtom text="Enviar" />                
                    <p>Não possui uma conta?</p>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
