import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import InputsPadronizados from "../utils/InputsPadronizados"
import SubmitButtom from "../utils/SubmitButtom"

import styles from "./authCSS/Register.module.css"

function Login() {

    const [mensagem, setMensagem] = useState()
    const [user, setuser] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    function submit(e) {
        console.log(user)
        EnviarUser(user)
        e.preventDefault()
    }

    function EnviarUser(user) {
        fetch("http://localhost:8000/api/user/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((rsp) => rsp.json())
          .then(data => {
            if (data.access) {
                localStorage.setItem("token", data.access);
                console.log("Token armazenado:", data.access);
                navigate("/main");

            } else {
                console.log("Erro ao fazer login:", data);
            }
        })
        .catch((err) => console.log(err))
    }

    function handleOnChange(e) {
        setuser({...user, [e.target.name]: e.target.value})
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
                    />

                    <InputsPadronizados 
                        name="password" 
                        placeholder="Digite a sua senha!" 
                        text="Senha" 
                        type="password" 
                        value={user.password} 
                        handleChange={handleOnChange} 
                        autoComplete="password"
                    />
                </div>

                <div className={styles.bottom}>
                    <SubmitButtom text="Enviar" />                
                    <p>Não possui uma conta?</p>
                    <a href="/register">Register</a>
                </div>
            </form>
        </div>
    )
}

export default Login