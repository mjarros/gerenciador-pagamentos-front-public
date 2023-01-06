import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagemClientes from "../../../Assets/clientes/modal-add-clientes/imagem-clientes.svg";
import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalEditarCliente() {
  const { editarCliente, setEditarCliente } = useGlobal();
  const [erroEmail, setErroEmail] = useState(false);
  const [erroCPF, setErroCPF] = useState(false);
  const [phoneIncorreto, setPhoneIncorreto] = useState(false);
  const { setEditarClienteConcluido } = useGlobal();
  const { localCliente, setLocalCliente } = useGlobal();

  const navigate = useNavigate();

  function handleChangeInput(e) {
    setLocalCliente({
      ...localCliente,
      [e.target.name]: e.target.value,
    });

    setErroEmail("");
    setErroCPF("");
    setPhoneIncorreto("");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const { name, email, phone, cpf } = localCliente;

    if (!name || !email || !cpf || !phone) {
      return;
    }

    try {
      const token = getItem("token");
      await api.put(`/client/${localCliente.id}`, localCliente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEditarCliente(false);
      setEditarClienteConcluido(true);

      setTimeout(() => {
        setEditarClienteConcluido(false);
        navigate("/clientes");
      }, 3000);
    } catch (error) {
      if (
        error.response.data.includes("cpf") ||
        error.response.data.includes("CPF")
      ) {
        setErroCPF(error.response.data);
      }

      if (error.response.data.includes("email")) {
        setErroEmail(error.response.data);
      }

      if (error.response.data.includes("phone")) {
        setPhoneIncorreto(error.response.data);
      }
    }
  }

  function closeModalAdicionarCliente() {
    setEditarCliente(false);
  }

  return (
    <>
      {editarCliente && (
        <div className="modal-cadastro-cliente">
          <div className="container-cadastro-cliente">
            <div className="container-cadastro-cliente-cabecalho">
              <div>
                <img src={imagemClientes} alt="imagem-clientes" />
                <span>Editar Cliente</span>
              </div>
              <img
                className="fechar-modal"
                onClick={() => closeModalAdicionarCliente()}
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
                  placeholder="Digite seu nome"
                  value={localCliente.name}
                />
                {!localCliente.name && (
                  <span className="editar-cliente-campo-obrigatorio">
                    Este campo deve ser preenchido
                  </span>
                )}
              </label>
              <label className="margin-botton">
                E-mail*
                <input
                  type="text"
                  name="email"
                  onChange={handleChangeInput}
                  placeholder="Digite seu e-mail"
                  value={localCliente.email}
                />
                {!localCliente.email && (
                  <span className="editar-cliente-campo-obrigatorio">
                    Este campo deve ser preenchido
                  </span>
                )}
                {erroEmail && (
                  <span className="editar-cliente-campo-obrigatorio">
                    {erroEmail}
                  </span>
                )}
              </label>

              <div className="container-cpf-rg">
                <label className="position-relative margin-botton">
                  CPF*
                  <input
                    type="number"
                    name="cpf"
                    onChange={handleChangeInput}
                    placeholder="Digite o CPF"
                    value={localCliente.cpf}
                  />
                  {!localCliente.cpf && (
                    <span className="editar-cliente-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                  {erroCPF && (
                    <span className="editar-cliente-campo-obrigatorio">
                      {erroCPF}
                    </span>
                  )}
                </label>
                <label className="position-relative margin-botton">
                  Telefone*
                  <input
                    type="number"
                    name="phone"
                    onChange={handleChangeInput}
                    placeholder="Digite seu telefone"
                    value={localCliente.phone}
                  />
                  {!localCliente.phone && (
                    <span className="editar-cliente-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                  {phoneIncorreto && (
                    <span className="editar-cliente-campo-obrigatorio">
                      {phoneIncorreto}
                    </span>
                  )}
                </label>
              </div>
              <label className="position-relative">
                Endereco
                <input
                  type="text"
                  name="adress"
                  onChange={handleChangeInput}
                  placeholder="Digite seu endereco"
                  value={localCliente.adress}
                />
              </label>
              <label className="position-relative">
                Complemento
                <input
                  type="text"
                  name="complement"
                  onChange={handleChangeInput}
                  placeholder="Digite o complemento"
                  value={localCliente.complement}
                />
              </label>
              <div className="container-cpf-rg">
                <label>
                  CEP
                  <input
                    type="number"
                    name="zip_code"
                    onChange={handleChangeInput}
                    placeholder="Digite o CEP"
                    value={localCliente.zip_code}
                  />
                </label>
                <label>
                  Bairro
                  <input
                    type="text"
                    name="district"
                    onChange={handleChangeInput}
                    placeholder="Digite o bairro"
                    value={localCliente.district}
                  />
                </label>
              </div>
              <div className="container-cpf-rg">
                <label className="position-relative margin-botton">
                  Cidade*
                  <input
                    type="text"
                    name="city"
                    onChange={handleChangeInput}
                    placeholder="Digite a cidade"
                    value={localCliente.city}
                  />
                  {!localCliente.city && (
                    <span className="editar-cliente-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                </label>
                <label className="position-relative margin-botton">
                  UF*
                  <input
                    type="text"
                    name="state"
                    onChange={handleChangeInput}
                    placeholder="Digite a uf"
                    value={localCliente.state}
                  />
                  {!localCliente.state && (
                    <span className="editar-cliente-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                </label>
              </div>
              <div className="editar-cliente-container-btns">
                <button
                  onClick={() => closeModalAdicionarCliente()}
                  className="cancelar-cadastro"
                  type="button"
                >
                  Cancelar
                </button>
                <button className="confirmar-cadastro" type="submit">
                  Finalizar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditarCliente;
