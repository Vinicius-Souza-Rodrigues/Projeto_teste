import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/container/MainContainer";
import AuthLayout from "./components/container/AuthContainer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import TarefasLista from "./components/layout/TarefasLista";

function App() {
  return (
    <Router>
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
                <Route path="/" element={<TarefasLista />} />
                <Route path="/lista" element={<TarefasLista />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
