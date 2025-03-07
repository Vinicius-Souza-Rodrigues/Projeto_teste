import { useEffect, useState } from "react";
import FormPadronizado from "../utils/FormPadronizado";

function TarefasCriar() {
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        console.log("Token recuperado:", storedToken);

        if (!storedToken) {
            console.error("Token não encontrado! Redirecionando para login...");
            window.location.href = "/login";
        } else {
            setToken(storedToken);
        }
    }, []);

    return (
        <div>
            <FormPadronizado />
        </div>
    );
}

export default TarefasCriar;
