import useGlobal from "../../../hooks/useGlobal";
import "./styles.css";
import imagemCadastroOk from "../../../Assets/modal-cadastro-cliente-concluido/cadastro-concluido-ok.svg";
import imagemCadastroFechar from "../../../Assets/modal-cadastro-cliente-concluido/cadastro-concluido-fechar.svg";

function ModalEditarCobrancaConcluido() {
  const { modalEditarCobrancaConcluido, setModalEditarCobrancaConcluido } =
    useGlobal();
  function handleFecharModalCadastroConcluido() {
    setModalEditarCobrancaConcluido(false);
  }

  return (
    <>
      {modalEditarCobrancaConcluido && (
        <div className="modal-cadastro-cliente-concluido">
          <img src={imagemCadastroOk} alt="imagem-cadastro-ok"></img>
          <span>Cobrança editada com sucesso!</span>
          <img
            className="cursor-pointer"
            onClick={() => handleFecharModalCadastroConcluido()}
            src={imagemCadastroFechar}
            alt="imagem-cadastro-fechar"
          ></img>
        </div>
      )}
    </>
  );
}

export default ModalEditarCobrancaConcluido;
