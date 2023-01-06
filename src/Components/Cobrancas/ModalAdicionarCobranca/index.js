import { useState } from "react";
import imagemClientes from "../../../Assets/clientes/modal-add-clientes/imagem-clientes.svg";
import cobrancaNaoSelecionada from "../../../Assets/modal-adicionar-cobranca/cobranca-nao-selecionada.svg";
import cobrancaSelecionada from "../../../Assets/modal-adicionar-cobranca/cobranca-selecionada.svg";
import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalAdicionarCobranca() {
  const [inputObrigatorio, setInputObrigatorio] = useState(false);

  const { modalCadastroCobranca, setModalCadastroCobranca } = useGlobal();
  const { formCadastroCobranca, setFormCadastroCobranca } = useGlobal();
  const { setModalCadastroCobrancaConcluido } = useGlobal();
  const { localCobrancasCliente, setLocalCobrancasCliente } = useGlobal();

  function handleChangeInput(e) {
    setFormCadastroCobranca({
      ...formCadastroCobranca,
      [e.target.name]: e.target.value,
    });
    setInputObrigatorio(false);
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const { name, description, expiration_date, value } = formCadastroCobranca;

    if (!name || !description || !value || !expiration_date) {
      setInputObrigatorio(true);
      return;
    }

    try {
      const token = getItem("token");

      await api.post(
        `/collection/${formCadastroCobranca.clients_collection_id}`,
        formCadastroCobranca,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLocalCobrancasCliente([
        ...localCobrancasCliente,
        formCadastroCobranca,
      ]);

      setFormCadastroCobranca({
        ...formCadastroCobranca,
        description: "",
        expiration_date: "",
        value: "",
        billing_status: false,
      });
      setModalCadastroCobranca(false);
      setModalCadastroCobrancaConcluido(true);

      setTimeout(() => {
        setModalCadastroCobrancaConcluido(false);
      }, 4000);
    } catch (error) {
      setInputObrigatorio(true);
    }
  }

  function closeModalAdicionarCobranca() {
    setModalCadastroCobranca(false);
    setFormCadastroCobranca({
      ...formCadastroCobranca,
      description: "",
      expiration_date: "",
      value: "",
      billing_status: false,
    });
  }

  function handleStatusCobrancaPaga() {
    setFormCadastroCobranca({
      ...formCadastroCobranca,
      billing_status: true,
    });
  }

  function handleStatusCobrancaPendente() {
    setFormCadastroCobranca({
      ...formCadastroCobranca,
      billing_status: false,
    });
  }

  return (
    <>
      {modalCadastroCobranca && (
        <div className="modal-cadastro-cobranca">
          <div className="container-cadastro-cobranca">
            <div className="container-cadastro-cobranca-cabecalho">
              <div>
                <img src={imagemClientes} alt="imagem-clientes" />
                <span>Cadastro de Cobrança</span>
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
                  value={formCadastroCobranca.name}
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
                  value={formCadastroCobranca.description}
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
                    value={formCadastroCobranca.expiration_date}
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
                    value={formCadastroCobranca.value}
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
                  {formCadastroCobranca.billing_status === true ? (
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
                  {formCadastroCobranca.billing_status === false ? (
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

export default ModalAdicionarCobranca;
