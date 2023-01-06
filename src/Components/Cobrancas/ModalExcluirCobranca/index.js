import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import atencaoExcluir from "../../../Assets/cobrancas/modal-exluir-cobranca/atencao-excluir.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalExcluirCobranca() {
  const { localCobrancasCliente, setLocalCobrancasCliente } = useGlobal();
  const { cobrancasExibir, setCobrancasExibir } = useGlobal();
  const { modalExcluirCobranca, setModalExcluirCobranca } = useGlobal();
  const { setModalExcluirCobrancaConcluido } = useGlobal();
  const { formCadastroCobranca, setFormCadastroCobranca } = useGlobal();
  const { setModalExcluirCobrancaErro } = useGlobal();

  async function handleSubmitDeleteCobranca() {
    const token = getItem("token");

    const { id, billing_satus, expiration_date } = formCadastroCobranca;

    try {
      if (
        new Date(expiration_date).toLocaleString("sv") <=
        new Date().toLocaleString("sv")
      ) {
        setModalExcluirCobranca(false);
        setModalExcluirCobrancaErro(true);

        setTimeout(() => {
          setModalExcluirCobrancaErro(false);
        }, 4000);
        return;
      }

      if (billing_satus === true) {
        setModalExcluirCobranca(false);
        setModalExcluirCobrancaErro(true);

        setTimeout(() => {
          setModalExcluirCobrancaErro(false);
        }, 4000);
        return;
      }

      await api.delete(`/collection/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const displayCobrancasCliente = [...localCobrancasCliente];

      const cobrancasRemanescentes = displayCobrancasCliente.filter(
        (cobrancas) => {
          return cobrancas.id !== id;
        }
      );

      setLocalCobrancasCliente([...cobrancasRemanescentes]);

      const displayTabelaCobrancas = [...cobrancasExibir];

      const cobrancasTabelaRemanescentes = displayTabelaCobrancas.filter(
        (cobrancas) => {
          return cobrancas.id !== id;
        }
      );

      setCobrancasExibir([...cobrancasTabelaRemanescentes]);

      setModalExcluirCobranca(false);
      setModalExcluirCobrancaConcluido(true);

      setFormCadastroCobranca({
        ...formCadastroCobranca,
        description: "",
        expiration_date: "",
        value: "",
        billing_status: false,
      });

      setTimeout(() => {
        setModalExcluirCobrancaConcluido(false);
      }, 4000);
    } catch (error) {}
  }

  return (
    <>
      {modalExcluirCobranca && (
        <div className="modal-excluir-cobranca">
          <div className="container-excluir-cobranca">
            <div className="icone-fechar">
              <img
                onClick={() => setModalExcluirCobranca(false)}
                src={iconeFechar}
                alt="icone-fechar"
              />
            </div>
            <img src={atencaoExcluir} alt="atencao-excluir" />
            <span>Tem certeza que deseja excluir esta cobrança?</span>
            <div className="container-confirmar-exclusao">
              <button
                onClick={() => setModalExcluirCobranca(false)}
                className="cancelar-exlusao"
                type="button"
              >
                Não
              </button>
              <button
                onClick={() => handleSubmitDeleteCobranca()}
                className="confirmar-exlusao"
                type="button"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalExcluirCobranca;
