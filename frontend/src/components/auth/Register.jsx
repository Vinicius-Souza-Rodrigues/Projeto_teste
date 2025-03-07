import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputsPadronizados from "../utils/InputsPadronizados";
import SubmitButtom from "../utils/SubmitButtom";
import styles from "./authCSS/Register.module.css";

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    
    const navigate = useNavigate();

    function EnviarUser(user) {
        
        fetch("http://localhost:8000/api/user/register/", {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(user),
        }).then((rsp) => rsp.json())
          .then((data) => {
            console.log(data)
            localStorage.setItem("mensagemSucesso", "Conta criada com sucesso! Faça login.");
          }) 
          .catch((err) => console.log(err))
          .finally(navigate("/Login"))
    }

    function submit(e) {
        e.preventDefault();
        EnviarUser(user)
        console.log("Dados enviados:", user);
    }

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className={styles.campo}>
            <div>
                <h2>Register</h2>
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
                        name="email" 
                        placeholder="Digite o seu email!" 
                        text="Email" 
                        type="text" 
                        value={user.email} 
                        handleChange={handleOnChange} 
                        autoComplete="email"
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
                    <p>Já possui um login?</p>
                    <a href="/login">Login</a>
                </div>
            </form>
        </div>
    );
}

export default Register;
