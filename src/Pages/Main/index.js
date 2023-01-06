import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import DisplayClientes from "../../Components/Main/DisplayClientes";
import DisplayCobrancas from "../../Components/Main/DisplayCobrancas";
import MenuEsquerda from "../../Components/Main/MenuEsquerda";
import SomasContainers from "../../Components/Main/SomasContainers";
import { getItem } from "../../Utils/storage";
import "./styles.css";

function Main() {
  const navigate = useNavigate();

  useEffect(() => {
    function verificarLoginRealizado() {
      const token = getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
    verificarLoginRealizado();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='main-container-geral'>
      <MenuEsquerda />
      <div className='main-container-header-dash'>
        <Header classeTitulo={"titulo-main"} titulo={"Resumo das cobranças"} />
        <SomasContainers />
        <DisplayCobrancas />
        <DisplayClientes />
      </div>
    </div>
  );
}

export default Main;
