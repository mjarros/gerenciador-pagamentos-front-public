import "./styles.css";
import imagemClientes from "../../../Assets/nav-menu/imagem-clientes.svg";
import imagemClientesSelecionado from "../../../Assets/nav-menu/imagem-clientes-selecionado.svg";
import imagemMain from "../../../Assets/nav-menu/imagem-home.svg";
import imagemMainSelecionado from "../../../Assets/nav-menu/imagem-home-selecionado.svg";
import imagemCobrancas from "../../../Assets/nav-menu/imagem-cobrancas.svg";
import imagemCobrancasSelecionado from "../../../Assets/nav-menu/imagem-cobrancas-selecionado.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setItem, getItem } from "../../../Utils/storage";

function MenuEsquerda() {
  useEffect(() => {
    function selectedPageColor() {
      const paginaSelecionada = getItem("pagina");
      setSelecionado(paginaSelecionada);
    }
    selectedPageColor();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const [selecionado, setSelecionado] = useState("");

  function handleNavigateMain() {
    setItem("pagina", "main");
    navigate("/main");
  }

  function handleNavigateClientes() {
    setItem("pagina", "clientes");
    navigate("/clientes");
  }

  function handleNavigateCobrancas() {
    setItem("pagina", "cobrancas");
    navigate("/cobrancas");
  }

  return (
    <div className='menu-esquerdo-container'>
      <div onClick={() => handleNavigateMain()} className={selecionado === "main" ? "selecionado-div-rosa" : null}>
        {selecionado === "main" ? <img src={imagemMainSelecionado} alt='imagem-main-selecionado' /> : <img src={imagemMain} alt='imagem-main' />}
        <span className={selecionado === "main" ? "selecionado-span-rosa" : null}>Home</span>
      </div>
      <div onClick={() => handleNavigateClientes()} className={selecionado === "clientes" ? "selecionado-div-rosa" : null}>
        {selecionado === "clientes" ? <img src={imagemClientesSelecionado} alt='imagem-clientes-selecionado' /> : <img src={imagemClientes} alt='imagem-clientes' />}
        <span className={selecionado === "clientes" ? "selecionado-span-rosa" : null}>Clientes</span>
      </div>
      <div onClick={() => handleNavigateCobrancas()} className={selecionado === "cobrancas" ? "selecionado-div-rosa" : null}>
        {selecionado === "cobrancas" ? <img src={imagemCobrancasSelecionado} alt='imagem-cobrancas-selecionado' /> : <img src={imagemCobrancas} alt='imagem-cobrancas' />}
        <span className={selecionado === "cobrancas" ? "selecionado-span-rosa" : null}>Cobranças</span>
      </div>
    </div>
  );
}

export default MenuEsquerda;
