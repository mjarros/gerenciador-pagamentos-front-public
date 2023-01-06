import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cadastroConfirmado from "../../Assets/cadastro/cadastro-confirmado.svg";
import VerticalStepper from "../../Components/Cadastro/Stepper";
import useGlobal from "../../hooks/useGlobal";
import api from "../../Services/api";
import "./styles.css";

function Cadastro() {
  useEffect(() => {
    const handleReset = () => {
      setActiveStep(0);
    };

    handleReset();
    // eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const { formCadastroUsuario, setFormCadastroUsuario } = useGlobal();
  const { activeStep, setActiveStep } = useGlobal();
  const { nome, email, senha, senhaConfirmar } = formCadastroUsuario;
  const [camposObrigatorios, setCamposObrigatorios] = useState(false);
  const [erroExiste, setErroExiste] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  function handleChangeInput(e) {
    setFormCadastroUsuario({
      ...formCadastroUsuario,
      [e.target.name]: e.target.value,
    });

    setCamposObrigatorios(false);
    setErroSenha(false);
    setErroExiste(false);
  }

  function handleNext() {
    if (!nome || !email) {
      setCamposObrigatorios(true);
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  async function handleSubmitCadastro() {
    try {
      if (!senha || !senhaConfirmar) {
        setCamposObrigatorios(true);
        return;
      }

      if (!senha.trim() || !senhaConfirmar.trim()) {
        setCamposObrigatorios(true);
        return;
      }

      if (senha !== senhaConfirmar) {
        setErroSenha(true);
        return;
      }

      await api.post("/user", {
        name: nome,
        email,
        password: senha,
      });

      setFormCadastroUsuario({
        name: "",
        email: "",
        cpf: "",
        phone: "",
        password: "",
        passwordConfirm: "",
      });

      handleNext();
    } catch (error) {
      setErroExiste(true);
      setErrorMessage(error.response.data);
    }
  }

  return (
    <div className="cadastro-container-geral">
      <div className="stepper-container">
        <VerticalStepper />
      </div>

      <div className="cadastro-container">
        <div className="dados-login-cadastro-container">
          {activeStep === 0 && (
            <>
              <h2>Adicione seus Dados</h2>
              <form>
                <label>
                  Nome*
                  <input
                    value={formCadastroUsuario.nome}
                    type="text"
                    name="nome"
                    onChange={handleChangeInput}
                  />
                </label>
                <label className="position-relative">
                  E-mail*
                  <input
                    value={formCadastroUsuario.email}
                    type="text"
                    name="email"
                    onChange={handleChangeInput}
                  />
                  {camposObrigatorios && (
                    <span className="position-absolute erro-login-nome-email">
                      Os campos Nome e E-mail são obrigatórios.
                    </span>
                  )}
                </label>
                <button type="button" onClick={() => handleNext()}>
                  Continuar
                </button>
              </form>
              <span>
                Já possui uma conta? Faça seu{" "}
                <strong type="button" onClick={() => navigate("/login")}>
                  Login
                </strong>
              </span>
            </>
          )}
          {activeStep === 1 && (
            <>
              <h2>Escolha uma senha</h2>
              <form>
                <label>
                  Senha*
                  <input
                    value={formCadastroUsuario.senha}
                    type="password"
                    name="senha"
                    onChange={handleChangeInput}
                  />
                </label>
                <label className="position-relative">
                  Repita a senha*
                  <input
                    value={formCadastroUsuario.senhaConfirmar}
                    type="password"
                    name="senhaConfirmar"
                    onChange={handleChangeInput}
                  />
                  {camposObrigatorios && (
                    <span className="position-absolute erro-login-senha">
                      Os campos Senha e Repita a senha são obrigatórios.
                    </span>
                  )}
                  {erroSenha && (
                    <span className="position-absolute mensagem-erro-senha-diferente">
                      As senhas não coincidem.
                    </span>
                  )}
                  {erroExiste && (
                    <span className="position-absolute mensagem-erro-email">
                      {errorMessage}
                    </span>
                  )}
                </label>
                <button type="button" onClick={() => handleSubmitCadastro()}>
                  Finalizar Cadastro
                </button>
              </form>
              <span>
                Já possui uma conta? Faça seu{" "}
                <strong type="button" onClick={() => navigate("/login")}>
                  Login
                </strong>
              </span>
            </>
          )}
          {activeStep === 2 && (
            <>
              <div className="cadastro-realizado">
                <img
                  src={cadastroConfirmado}
                  alt="imagem cadastro confirmado"
                />
                <span>Cadastro realizado com sucesso!</span>
              </div>
              <button
                onClick={() => navigate("/login")}
                className="ir-login"
                type="button"
              >
                Ir para Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
