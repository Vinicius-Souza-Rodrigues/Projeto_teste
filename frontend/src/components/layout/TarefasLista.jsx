import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Cardtarefa from "../main/CardTarefa"

import styles from "./layoutCSS/TarefasLista.module.css"

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
                {tarefas.length > 0 ? (
                    <div className={styles.lista}>
                        {tarefas.map((tarefa) => (
                            <Cardtarefa 
                                name={tarefa.name} 
                                state={tarefa.state} 
                                description={tarefa.description} 
                                date={tarefa.date}
                            />
                        ))}
                    </div>
                ) : (
                    <div className={styles.nada}>
                        <p className={styles.nothing}>Nenhuma tarefa encontrada!</p>            
                        
                        <div className={styles.header}>
                            <h2>Deseja criar uma tarefa?</h2>
                            <Link to="/tarefa/criar" className={styles.link}>Criar</Link>
                        </div>
                    </div>
                )}
            </div>
    );
}

export default TarefasLista;
