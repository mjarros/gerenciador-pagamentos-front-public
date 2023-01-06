import { useState } from "react";
import imagemClientes from "../../../Assets/clientes/modal-add-clientes/imagem-clientes.svg";
import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import clearUserData from "../../../Utils/clearUserData";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalAdicionarCliente() {
  let { formCadastroCliente, setFormCadastroCliente } = useGlobal();
  const { adicionarCliente, setAdicionarCliente } = useGlobal();
  const [inputObrigatorio, setInputObrigatorio] = useState(false);
  const [erroEmail, setErroEmail] = useState(false);
  const [erroCPF, setErroCPF] = useState(false);
  const [phoneIncorreto, setPhoneIncorreto] = useState(false);
  const { setCadastroClienteConcluido } = useGlobal();
  const { localArrayClientes, setLocalArrayClientes } = useGlobal();

  function handleChangeInput(e) {
    setFormCadastroCliente({
      ...formCadastroCliente,
      [e.target.name]: e.target.value,
    });
    setInputObrigatorio(false);
    setErroEmail("");
    setErroCPF("");
    setPhoneIncorreto("");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const { name, email, phone, cpf, city, state } = formCadastroCliente;

    if (!name || !email || !cpf || !phone || !city || !state) {
      setInputObrigatorio(true);
      return;
    }

    try {
      const token = getItem("token");
      await api.post("/client", formCadastroCliente, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLocalArrayClientes([...localArrayClientes, formCadastroCliente]);
      clearUserData(formCadastroCliente, setFormCadastroCliente);
      setAdicionarCliente(false);
      setCadastroClienteConcluido(true);

      setTimeout(() => {
        setCadastroClienteConcluido(false);
      }, 4000);
    } catch (error) {
      if (error.response.data.includes("CPF")) {
        setErroCPF(error.response.data);
      }

      if (error.response.data.includes("cpf")) {
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
    setAdicionarCliente(false);
    clearUserData(formCadastroCliente, setFormCadastroCliente);
  }

  return (
    <>
      {adicionarCliente && (
        <div className="modal-cadastro-cliente">
          <div className="container-cadastro-cliente">
            <div className="container-cadastro-cliente-cabecalho">
              <div>
                <img src={imagemClientes} alt="imagem-clientes" />
                <span>Cadastro do Cliente</span>
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
                  value={formCadastroCliente.name}
                />
                {inputObrigatorio && (
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
                  value={formCadastroCliente.email}
                />
                {inputObrigatorio && (
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
                    value={formCadastroCliente.cpf}
                  />
                  {inputObrigatorio && (
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
                    value={formCadastroCliente.phone}
                  />
                  {inputObrigatorio && (
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
                  value={formCadastroCliente.adress}
                />
              </label>
              <label className="position-relative">
                Complemento
                <input
                  type="text"
                  name="complement"
                  onChange={handleChangeInput}
                  placeholder="Digite o complemento"
                  value={formCadastroCliente.complement}
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
                    value={formCadastroCliente.zip_code}
                  />
                </label>
                <label>
                  Bairro
                  <input
                    type="text"
                    name="district"
                    onChange={handleChangeInput}
                    placeholder="Digite o bairro"
                    value={formCadastroCliente.district}
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
                    value={formCadastroCliente.city}
                  />
                  {inputObrigatorio && (
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
                    value={formCadastroCliente.state}
                  />
                  {inputObrigatorio && (
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

export default ModalAdicionarCliente;
