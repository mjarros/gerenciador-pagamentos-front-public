import "./styles.css";
import Header from "../../../Components/Header";
import MenuEsquerda from "../../../Components/Main/MenuEsquerda";
import HeaderDeatlhesCliente from "../../../Components/DetalhesCliente/HeaderDetalhesCliente";
import DadosCliente from "../../../Components/DetalhesCliente/DadosCliente";
import { useParams } from "react-router";
import ModalEditarCliente from "../../../Components/DetalhesCliente/ModalEditarCliente";
import ModalEditarClienteConcluido from "../../../Components/DetalhesCliente/ModalEditarClienteConcluido";
import CobrancasCliente from "../../../Components/DetalhesCliente/CobrancasCliente";
import ModalAdicionarCobranca from "../../../Components/Cobrancas/ModalAdicionarCobranca";
import ModalCadastroCobrancaConcluido from "../../../Components/Cobrancas/ModalCadastroCobrancaConcluido";
import ModalEditarCobranca from "../../../Components/Cobrancas/ModalEditarCobranca";
import ModalEditarCobrancaConcluido from "../../../Components/Cobrancas/ModalEditarCobrancaConcluido";
import ModalExcluirCobranca from "../../../Components/Cobrancas/ModalExcluirCobranca";
import ModalExcluirCobrancaConcluido from "../../../Components/Cobrancas/ModalExcluirCobrancaConcluido";
import ModalExcluirCobrancaErro from "../../../Components/Cobrancas/ModalExcluirCobrancaErro";

function DetalhesCliente() {
  const { id } = useParams();

  return (
    <div className="main-container-geral-clientes">
      <MenuEsquerda height={"100vh"} />
      <div className="main-container-header-dash">
        <Header
          classeTitulo={"titulo-clientes"}
          titulo={"Clientes"}
          classeTitulo2={"titulo-clientes2"}
          titulo2={"> Detalhes do Cliente"}
        />
        <HeaderDeatlhesCliente clienteId={id} />
        <DadosCliente clienteId={id} />
        <CobrancasCliente clienteId={id} />
      </div>
      <ModalEditarCliente />
      <ModalEditarClienteConcluido />
      <ModalAdicionarCobranca />
      <ModalCadastroCobrancaConcluido />
      <ModalEditarCobranca />
      <ModalEditarCobrancaConcluido />
      <ModalExcluirCobranca />
      <ModalExcluirCobrancaConcluido />
      <ModalExcluirCobrancaErro />
    </div>
  );
}

export default DetalhesCliente;
