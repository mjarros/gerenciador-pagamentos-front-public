import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import Cadastro from "./Pages/Cadastro";
import Login from "./Pages/Login";
import Main from "./Pages/Main";
import Clientes from "./Pages/Clientes/Main";
import DetalhesCliente from "./Pages/Clientes/DetalhesCliente";
import Cobrancas from "./Pages/Cobrancas";
import { getItem } from "./Utils/storage";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}
function MainRoutes() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route path="/main" element={<Main />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route
            path="/clientes/detalhes-cliente/:id"
            element={<DetalhesCliente />}
          />
          <Route path="/cobrancas" element={<Cobrancas />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </GlobalProvider>
  );
}

export default MainRoutes;
