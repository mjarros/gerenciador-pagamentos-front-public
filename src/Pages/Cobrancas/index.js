import "./styles.css";
import Header from "../../Components/Header";
import MenuEsquerda from "../../Components/Main/MenuEsquerda";
import InternalHeaderCobrancas from "../../Components/Cobrancas/InternalHeaderCobrancas";
import TabelaCobrancas from "../../Components/Cobrancas/TabelaCobrancas";
import ModalEditarCobranca from "../../Components/Cobrancas/ModalEditarCobranca";
import ModalEditarCobrancaConcluido from "../../Components/Cobrancas/ModalEditarCobrancaConcluido";
import ModalExcluirCobranca from "../../Components/Cobrancas/ModalExcluirCobranca";
import ModalExcluirCobrancaConcluido from "../../Components/Cobrancas/ModalExcluirCobrancaConcluido";
import ModalExcluirCobrancaErro from "../../Components/Cobrancas/ModalExcluirCobrancaErro";
import ModalDetalhesCobranca from "../../Components/Cobrancas/ModalDetalhesCobranca";

function Cobrancas() {
  return (
    <div className="main-container-geral">
      <MenuEsquerda height={"103.75vh"} />
      <div className="main-container-header-dash">
        <Header classeTitulo={"titulo-cobrancas"} titulo={"Cobranças"} />
        <InternalHeaderCobrancas />
        <TabelaCobrancas />
      </div>
      <ModalEditarCobranca />
      <ModalEditarCobrancaConcluido />
      <ModalExcluirCobranca />
      <ModalExcluirCobrancaConcluido />
      <ModalExcluirCobrancaErro />
      <ModalDetalhesCobranca />
    </div>
  );
}

export default Cobrancas;
