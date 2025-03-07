import { useState } from "react";
import SubmitButtom from "./SubmitButtom";

function FormPadronizado( {TarefasData}) {

    const [tarefa, setTarefa] = useState(TarefasData || {})

    function handleOnChange(e) {
        setTarefa({ ...tarefa, [e.target.name]: e.target.value });
    }

    function submit(e) {
        e.preventDefault
        Enviar(tarefa)
    }

    function Enviar(tarefa) {
        const token = localStorage.getItem("token");
        console.log(tarefa)

        fetch("http://localhost:8000/api/tarefas/create/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(tarefa),
        }).then((rsp) => rsp.json())
          .then((data) => {
            console.log(data)
          })
          .catch((err) => console.log(err))
    }

    return (

        <form action={submit}>
            <div>
                <label htmlFor="name">Nome</label>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Digite o nome aqui" 
                    onChange={handleOnChange} 
                    value={tarefa.name || ""}
                />
            </div>

            <div>
                <label htmlFor="state">Status</label>
                <select 
                    name="state" 
                    onChange={handleOnChange} 
                    value={tarefa.state}
                >
                    <option value="">Selecione um status</option>
                    <option value="em_andamento">Em andamento</option>
                    <option value="pendente">Pendente</option>
                    <option value="finalizado">Finalizado</option>
                </select>
            </div>

            <div>
                <label htmlFor="description">Descrição</label>
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Descreva a tarefa aqui" 
                    onChange={handleOnChange} 
                    value={tarefa.description || ""}
                />
            </div>

            <div>
            <label htmlFor="date">Marque a data</label>
            <input 
                type="date" 
                name="date" 
                onChange={handleOnChange} 
                value={tarefa.date || ""}
            />
            </div>

            <div>
                <SubmitButtom text="Enviar"/>
            </div>
        </form>
    );
}

export default FormPadronizado;
