import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import InputsPadronizados from "../utils/InputsPadronizados";
import SubmitButtom from "../utils/SubmitButtom";
import styles from "./authCSS/Register.module.css";

function Register() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false
    });

    const navigate = useNavigate();

    async function EnviarUser(user) {
        try {
            const response = await fetch("http://localhost:8000/api/user/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            }).then((rsp) => {
                if (rsp.status == 200) {
                    toast.success("Conta criada com sucesso! Faça login!")
                    navigate("/login")
                    }

                if (!user.username.trim() || !user.password.trim() || !user.email.trim()) {
                    toast.error("Preencha todos os campos!", {
                        style: { width: "251px", fontSize: "16px", padding: "10px" }
                    })

                    setErrors({
                        username: !user.username.trim(),
                        email: !user.email.trim(),
                        password: !user.password.trim()
                    });

                    return;
                }
            })

        } catch (error) {
            toast.error(error.message);
        }
    }

    function submit(e) {
        e.preventDefault();
        EnviarUser(user);
        console.log("Dados enviados:", user);
    }

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className={styles.campo}>
            <h2>Register</h2>
            <form onSubmit={submit}>
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
                    name="email" 
                    placeholder="Digite o seu email!" 
                    text="Email" 
                    type="text" 
                    value={user.email} 
                    handleChange={handleOnChange} 
                    autoComplete="email"
                    hasError={errors.email}
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
                <div className={styles.bottom}>
                    <SubmitButtom text="Enviar" />                
                    <p>Já possui um login?</p>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
