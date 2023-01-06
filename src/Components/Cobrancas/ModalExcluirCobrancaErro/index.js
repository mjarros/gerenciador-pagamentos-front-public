import useGlobal from "../../../hooks/useGlobal";
import "./styles.css";
import erroVermelho from "../../../Assets/cobrancas/modal-editar-cobranca-erro/erro-vermelho.svg";
import imagemCadastroFecharVermelho from "../../../Assets/cobrancas/modal-editar-cobranca-erro/fechar-quadrado-vermelho.svg";

function ModalExcluirCobrancaErro() {
  const { modalExcluirCobrancaErro, setModalExcluirCobrancaErro } = useGlobal();
  function handleFecharModalErroEditar() {
    setModalExcluirCobrancaErro(false);
  }

  return (
    <>
      {modalExcluirCobrancaErro && (
        <div className="modal-editar-cobranca-erro">
          <img src={erroVermelho} alt="imagem-cadastro-ok"></img>
          <span>Esta cobrança não pode ser excluída!</span>
          <img
            className="cursor-pointer"
            onClick={() => handleFecharModalErroEditar()}
            src={imagemCadastroFecharVermelho}
            alt="imagem-cadastro-fechar"
          ></img>
        </div>
      )}
    </>
  );
}

export default ModalExcluirCobrancaErro;
