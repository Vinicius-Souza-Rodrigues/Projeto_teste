import { useEffect, useState } from "react";

import Cardtarefa from "../main/main"
import SubmitButtom from "../utils/SubmitButtom"

function TarefasLista() {
    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch("http://localhost:8000/api/tarefas/get", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        }) 
        .then((rsp) => rsp.json())
        .then((data) => {
            console.log(data);
            setTarefas(data);
        })
        .catch((err) => console.error(err));
    }, []);

    return (
        <div>

            <div>
                <h2>Deseja criar uma tarefa?</h2>

                <a href="/tarefa/criar">Algo</a>
            </div>

            <div>

                {tarefas.length > 0 ? (
                    <ul>
                        {tarefas.map((tarefa) => (
                            <Cardtarefa 
                                name={tarefa.name} 
                                state={tarefa.state} 
                                description={tarefa.description} 
                                date={tarefa.date}
                            />
                        ))}
                    </ul>
                ) : (
                    <div>
                        <p>Nenhuma tarefa encontrada!</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TarefasLista;
