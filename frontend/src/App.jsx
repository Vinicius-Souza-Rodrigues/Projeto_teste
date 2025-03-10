import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Importa o CSS do Toastify

import MainLayout from "./components/container/MainContainer";
import AuthLayout from "./components/container/AuthContainer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import TarefasLista from "./components/layout/TarefasLista";
import TarefasCriar from "./components/layout/TarefasCriar";
import Logout from "./components/layout/Logout"

function App() {
  return (
    <>
    <ToastContainer 
    autoClose={2500} />
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/main" element={<TarefasLista />} />
          <Route path="/tarefa/criar" element={<TarefasCriar />} />
          <Route path="/logout" element={<Logout />}/>
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
