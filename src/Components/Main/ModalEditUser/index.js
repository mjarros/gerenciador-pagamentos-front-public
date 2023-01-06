import { useState } from "react";
import cadastroConfirmado from "../../../Assets/modal-editar-usuario/cadastro-confirmado.svg";
import closedEye from "../../../Assets/modal-editar-usuario/close-eye.svg";
import iconeFechar from "../../../Assets/modal-editar-usuario/icone-fechar.svg";
import openedEye from "../../../Assets/modal-editar-usuario/open-eye.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import clearUserData from "../../../Utils/clearUserData";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function ModalEditUser() {
  let {
    formCadastroUsuario,
    setFormCadastroUsuario,
    editUser,
    setEditUser,
    setEditLogoutUser,
  } = useGlobal();

  const [cadastroConcluido, setCadastroConcluido] = useState(false);
  const [inputObrigatorio, setInputObrigatorio] = useState(false);
  const [erroEmail, setErroEmail] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [erroCPFInvalido, setErroCPFInvalido] = useState("");
  const [erroCPFCadastrado, setErroCPFCadastrado] = useState("");
  const [senhaDiferente, setSenhaDiferente] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirmar, setMostrarSenhaConfirmar] = useState(false);

  function handleChangeInput(e) {
    setFormCadastroUsuario({
      ...formCadastroUsuario,
      [e.target.name]: e.target.value,
    });
    setInputObrigatorio(false);
    setSenhaDiferente(false);
    setErroEmail("");
    setErroSenha("");
    setErroCPFInvalido("");
    setErroCPFCadastrado("");
  }

  async function handleSubmitForm(e) {
    e.preventDefault();

    const { name, email, password, passwordConfirm } = formCadastroUsuario;

    if (!name || !email || !password || !passwordConfirm) {
      setInputObrigatorio(true);
      return;
    }

    if (password !== passwordConfirm) {
      setSenhaDiferente(true);
      return;
    }

    try {
      const token = getItem("token");

      await api.put("/user", formCadastroUsuario, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json;charset=utf-8",
          "Access-Control-Allow-Origin": "*",
        },
      });

      clearUserData(formCadastroUsuario, setFormCadastroUsuario);
      setEditLogoutUser(false);
      setCadastroConcluido(true);

      setTimeout(() => {
        setEditUser(!editUser);
        setCadastroConcluido(false);
      }, 2500);
    } catch (error) {
      if (error.response.data.includes("email")) {
        setErroEmail(error.response.data);
      }

      if (error.response.data.includes("password")) {
        setErroSenha(error.response.data);
      }

      if (error.response.data.includes("cpf")) {
        setErroCPFInvalido(error.response.data);
      }

      if (error.response.data.includes("CPF")) {
        setErroCPFCadastrado(error.response.data);
      }
    }
  }

  function closeModalEditUser() {
    setEditUser(false);
    setEditLogoutUser(false);
    clearUserData(formCadastroUsuario, setFormCadastroUsuario);
  }

  return (
    <>
      {editUser && (
        <div className="modal-editar-usuario">
          {!cadastroConcluido && (
            <div className="container-editar-usuario">
              <div className="container-editar-usuario-cabecalho">
                <span>Edite seu cadastro</span>
                <img
                  onClick={() => closeModalEditUser()}
                  src={iconeFechar}
                  alt="icone-fechar"
                />
              </div>
              <form onSubmit={handleSubmitForm}>
                <label>
                  Nome*
                  <input
                    type="text"
                    name="name"
                    onChange={handleChangeInput}
                    placeholder="Digite seu nome"
                    value={formCadastroUsuario.name}
                  />
                  {inputObrigatorio && (
                    <span className="editar-usuario-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                </label>
                <label>
                  E-mail*
                  <input
                    type="text"
                    name="email"
                    onChange={handleChangeInput}
                    placeholder="Digite seu e-mail"
                    value={formCadastroUsuario.email}
                  />
                  {inputObrigatorio && (
                    <span className="editar-usuario-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                  {erroEmail && (
                    <span className="editar-usuario-campo-obrigatorio">
                      {erroEmail}
                    </span>
                  )}
                </label>

                <div className="container-cpf-rg">
                  <label>
                    CPF
                    <input
                      type="number"
                      name="cpf"
                      onChange={handleChangeInput}
                      placeholder="Digite seu CPF"
                      value={formCadastroUsuario.cpf}
                    />
                    {erroCPFInvalido && (
                      <span className="editar-usuario-campo-obrigatorio">
                        {erroCPFInvalido}
                      </span>
                    )}
                    {erroCPFCadastrado && (
                      <span className="editar-usuario-campo-obrigatorio">
                        {erroCPFCadastrado}
                      </span>
                    )}
                  </label>
                  <label>
                    Telefone
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChangeInput}
                      placeholder="Digite seu telefone"
                      value={formCadastroUsuario.phone}
                    />
                  </label>
                </div>
                <label className="position-relative">
                  Nova senha*
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    name="password"
                    onChange={handleChangeInput}
                    placeholder="Digite sua senha"
                    value={formCadastroUsuario.password}
                  />
                  {mostrarSenha ? (
                    <img
                      className="imagem-olho-fechado"
                      src={openedEye}
                      alt="olho-aberto"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    />
                  ) : (
                    <img
                      className="imagem-olho-fechado"
                      src={closedEye}
                      alt="olho-fechado"
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                    />
                  )}
                  {inputObrigatorio && (
                    <span className="editar-usuario-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                  {senhaDiferente && (
                    <span className="editar-usuario-campo-obrigatorio">
                      As senhas não coincidem
                    </span>
                  )}
                  {erroSenha && (
                    <span className="editar-usuario-campo-obrigatorio">
                      {erroSenha}
                    </span>
                  )}
                </label>
                <label className="position-relative">
                  Confirmar senha*
                  <input
                    type={mostrarSenhaConfirmar ? "text" : "password"}
                    name="passwordConfirm"
                    onChange={handleChangeInput}
                    placeholder="Confirme sua senha"
                    value={formCadastroUsuario.passwordConfirm}
                  />
                  {mostrarSenhaConfirmar ? (
                    <img
                      className="imagem-olho-fechado"
                      src={openedEye}
                      alt="olho-aberto"
                      onClick={() =>
                        setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)
                      }
                    />
                  ) : (
                    <img
                      className="imagem-olho-fechado"
                      src={closedEye}
                      alt="olho-fechado"
                      onClick={() =>
                        setMostrarSenhaConfirmar(!mostrarSenhaConfirmar)
                      }
                    />
                  )}
                  {inputObrigatorio && (
                    <span className="editar-usuario-campo-obrigatorio">
                      Este campo deve ser preenchido
                    </span>
                  )}
                  {senhaDiferente && (
                    <span className="editar-usuario-campo-obrigatorio">
                      As senhas não coincidem
                    </span>
                  )}
                  {erroSenha && (
                    <span className="editar-usuario-campo-obrigatorio">
                      {erroSenha}
                    </span>
                  )}
                </label>
                <button type="submit">Finalizar Cadastro</button>
              </form>
            </div>
          )}
          {cadastroConcluido && (
            <div className="container-editar-usuario-concluido">
              <img src={cadastroConfirmado} alt="cadastro-realizado-sucesso" />
              <span className="editar-usuario-cadastro-concluido">
                Cadastro Alterado com sucesso!
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ModalEditUser;
