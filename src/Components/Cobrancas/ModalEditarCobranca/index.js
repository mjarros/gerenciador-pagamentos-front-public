import { useState } from "react";
import imagemClientes from "../../../Assets/clientes/modal-add-clientes/imagem-clientes.svg";
import cobrancaNaoSelecionada from "../../../Assets/modal-adicionar-cobranca/cobranca-nao-selecionada.svg";
import cobrancaSelecionada from "../../../Assets/modal-adicionar-cobranca/cobranca-selecionada.svg";
import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalEditarCobranca() {
  const [inputObrigatorio, setInputObrigatorio] = useState(false);

  const { cobrancasExibir, setCobrancasExibir } = useGlobal();
  const { localCobrancasCliente, setLocalCobrancasCliente } = useGlobal();

  const { modalEditarCobranca, setModalEditarCobranca } = useGlobal();
  const { formEditarCobranca, setFormEditarCobranca } = useGlobal();
  const { setModalEditarCobrancaConcluido } = useGlobal();

  function handleChangeInput(e) {
    setFormEditarCobranca({
      ...formEditarCobranca,
      [e.target.name]: e.target.value,
    });
    setInputObrigatorio(false);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const { id, name, description, expiration_date, value } =
      formEditarCobranca;

    if (!name || !description || !value || !expiration_date) {
      setInputObrigatorio(true);
      return;
    }

    const formEnviarEditarCobranca = { id, ...formEditarCobranca };

    try {
      const token = getItem("token");
      await api.put(`/collection/${id}`, formEnviarEditarCobranca, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      const displayCobrancasCliente = [...localCobrancasCliente];

      const cobrancasRemanescentes = displayCobrancasCliente.filter(
        (cobrancas) => {
          return cobrancas.id !== id;
        }
      );

      setLocalCobrancasCliente([...cobrancasRemanescentes, formEditarCobranca]);

      const displayTabelaCobrancas = [...cobrancasExibir];

      const cobrancasTabelaRemanescentes = displayTabelaCobrancas.filter(
        (cobrancas) => {
          return cobrancas.id !== id;
        }
      );

      setCobrancasExibir([...cobrancasTabelaRemanescentes, formEditarCobranca]);

      setFormEditarCobranca({
        ...formEditarCobranca,
        clients_collection_id: "",
        description: "",
        expiration_date: "",
        value: "",
        billing_status: false,
      });
      setModalEditarCobranca(false);
      setModalEditarCobrancaConcluido(true);

      setTimeout(() => {
        setModalEditarCobrancaConcluido(false);
      }, 4000);
    } catch (error) {
      setInputObrigatorio(true);
    }
  }

  function closeModalAdicionarCobranca() {
    setModalEditarCobranca(false);
    setFormEditarCobranca({
      ...formEditarCobranca,
      description: "",
      expiration_date: "",
      value: "",
      billing_status: false,
    });
  }

  function handleStatusCobrancaPaga() {
    setFormEditarCobranca({
      ...formEditarCobranca,
      billing_status: true,
    });
  }

  function handleStatusCobrancaPendente() {
    setFormEditarCobranca({
      ...formEditarCobranca,
      billing_status: false,
    });
  }

  return (
    <>
      {modalEditarCobranca && (
        <div className="modal-cadastro-cobranca">
          <div className="container-cadastro-cobranca">
            <div className="container-cadastro-cobranca-cabecalho">
              <div>
                <img src={imagemClientes} alt="imagem-clientes" />
                <span>Edição de Cobrança</span>
              </div>
              <img
                className="fechar-modal"
                onClick={() => closeModalAdicionarCobranca()}
                src={iconeFechar}
                alt="icone-fechar"
              />
            </div>
            <form onSubmit={handleSubmitForm}>
              <label className="margin-botton">
                Nome*
                <input
                  type="text"
                  name="name"
                  onChange={handleChangeInput}
                  placeholder="Digite o nome do cliente"
                  value={formEditarCobranca.name}
                />
                {inputObrigatorio && (
                  <span className="editar-cobranca-campo-obrigatorio">
                    Este campo deve ser preenchido
                  </span>
                )}
              </label>
              <label className="margin-botton">
                Descrição*
                <textarea
                  type="textarea"
                  rows={3}
                  cols={3}
                  name="description"
                  onChange={handleChangeInput}
                  placeholder="Digite a descriçao"
                  value={formEditarCobranca.description}
                />
                {inputObrigatorio && (
                  <span className="editar-cobranca-campo-obrigatorio-descricao">
                    Este campo deve ser preenchido
                  </span>
                )}
              </label>
              <div className="container-vencimento-valor">
                <label className="position-relative margin-botton">
                  Vencimento*
                  <input
                    type="date"
                    name="expiration_date"
                    onChange={handleChangeInput}
                    placeholder="Digite a data de vencimento"
                    value={new Date(
                      formEditarCobranca.expiration_date
                    ).toLocaleDateString("sv")}
                  />
                  {inputObrigatorio && (
                    <span className="editar-cobranca-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                </label>
                <label className="position-relative margin-botton">
                  Valor*
                  <input
                    type="number"
                    name="value"
                    onChange={handleChangeInput}
                    placeholder="Digite o valor"
                    value={formEditarCobranca.value}
                  />
                  {inputObrigatorio && (
                    <span className="editar-cobranca-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                </label>
              </div>
              <div className="selecionar-status-cobranca">
                <button
                  onClick={() => handleStatusCobrancaPaga()}
                  type="button"
                >
                  {formEditarCobranca.billing_status === true ? (
                    <img src={cobrancaSelecionada} alt="cobranca-paga" />
                  ) : (
                    <img src={cobrancaNaoSelecionada} alt="cobranca-pendente" />
                  )}
                  Cobrança Paga
                </button>
                <button
                  onClick={() => handleStatusCobrancaPendente()}
                  type="button"
                >
                  {formEditarCobranca.billing_status === false ? (
                    <img src={cobrancaSelecionada} alt="cobranca-paga" />
                  ) : (
                    <img src={cobrancaNaoSelecionada} alt="cobranca-pendente" />
                  )}
                  Cobrança Pendente
                </button>
              </div>
              <div className="editar-cobranca-container-btns">
                <button
                  onClick={() => closeModalAdicionarCobranca()}
                  className="cancelar-cadastro"
                  type="button"
                >
                  Cancelar
                </button>
                <button className="confirmar-cadastro" type="submit">
                  Aplicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditarCobranca;
