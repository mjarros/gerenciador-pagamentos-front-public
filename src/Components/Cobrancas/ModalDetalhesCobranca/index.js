import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import iconeDocumento from "../../../Assets/cobrancas/modal-detalhes-cobranca/icone-documento.svg";
import useGlobal from "../../../hooks/useGlobal";
import "./styles.css";

function ModalDetalhesCobranca() {
  const { modalDetalhesCobranca, setModalDetalhesCobranca } = useGlobal();
  const { formCadastroCobranca } = useGlobal();

  const { nomeClienteCobranca } = useGlobal();

  return (
    <>
      {modalDetalhesCobranca && (
        <div className="modal-detalhes-cobranca">
          <div className="container-detalhes-cobranca">
            <div className="icone-fechar">
              <img
                onClick={() => setModalDetalhesCobranca(false)}
                src={iconeFechar}
                alt="icone-fechar"
              />
            </div>
            <div className="modal-detalhes-cobranca-cabecalho">
              <img src={iconeDocumento} alt="icone-documento" />
              <span>Detalhe da Cobrança</span>
            </div>

            <div className="modal-detalhes-cobranca-nome-e-descricao">
              <span className="titulo">Nome</span>
              <span className="informacao">{nomeClienteCobranca}</span>
            </div>

            <div className="modal-detalhes-cobranca-nome-e-descricao">
              <span className="titulo">Descrição</span>
              <textarea
                rows="2"
                className="informacao"
                value={formCadastroCobranca.description}
                readOnly={true}
              ></textarea>
            </div>

            <div className="modal-detalhes-cobranca-vencimento-e-valor">
              <div>
                <span className="titulo">Vencimento</span>
                <span className="informacao">
                  {new Date(
                    formCadastroCobranca.expiration_date
                  ).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="titulo">Valor</span>
                <span className="informacao">
                  {parseInt(formCadastroCobranca.value).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="modal-detalhes-cobranca-idcobrancas-e-status">
              <div>
                <span className="titulo">ID Cobranças</span>
                <span className="informacao">{formCadastroCobranca.id}</span>
              </div>

              <div>
                <span className="titulo">Status</span>
                {formCadastroCobranca.billing_status === true && (
                  <span className="status adimplente">Paga</span>
                )}
                {formCadastroCobranca.billing_status === false &&
                new Date(formCadastroCobranca.expiration_date) >= new Date() ? (
                  <span className="status pendente">Pendente</span>
                ) : (
                  formCadastroCobranca.billing_status === false && (
                    <span className="status inadimplente">Vencida</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalDetalhesCobranca;
