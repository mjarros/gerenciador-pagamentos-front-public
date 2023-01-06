import "./styles.css";
import Header from "../../../Components/Header";
import MenuEsquerda from "../../../Components/Main/MenuEsquerda";
import InternalHeader from "../../../Components/Clientes/InternalHeader";
import TabelaClientes from "../../../Components/Clientes/TabelaClientes";
import ModalAdicionarCliente from "../../../Components/Clientes/ModalAdicionarClientes";
import ModalCadastroClienteConcluido from "../../../Components/Clientes/ModalCadastroClienteConcluido";
import ModalAdicionarCobranca from "../../../Components/Cobrancas/ModalAdicionarCobranca";
import ModalCadastroCobrancaConcluido from "../../../Components/Cobrancas/ModalCadastroCobrancaConcluido";

function Clientes() {
  return (
    <div className='main-container-geral-clientes'>
      <MenuEsquerda />
      <div className='main-container-header-dash'>
        <Header classeTitulo={"titulo-clientes"} titulo={"Clientes"} />
        <InternalHeader />
        <TabelaClientes />
      </div>
      <ModalAdicionarCliente />
      <ModalCadastroClienteConcluido />
      <ModalAdicionarCobranca />
      <ModalCadastroCobrancaConcluido />
    </div>
  );
}

export default Clientes;
