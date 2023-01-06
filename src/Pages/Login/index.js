import { useNavigate } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import api from "../../Services/api";
import clearUserData from "../../Utils/clearUserData";
import { setItem } from "../../Utils/storage";
import "./styles.css";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const { formCadastroUsuario, setFormCadastroUsuario } = useGlobal();
  const { email, senha } = formCadastroUsuario;

  const [erroLogin, setErroLogin] = useState(false);

  function handleChangeInput(e) {
    setFormCadastroUsuario({
      ...formCadastroUsuario,
      [e.target.name]: e.target.value,
    });
    setErroLogin(false);
  }

  async function handleSubmitLogin(e) {
    e.preventDefault();

    try {
      console.log(email, senha);

      const response = await api.post("/login", {
        email,
        password: senha,
      });

      const { token, usuario } = response.data;
      setItem("token", token);
      setItem("userId", usuario.id);
      setItem("userName", usuario.name);

      clearUserData(formCadastroUsuario, setFormCadastroUsuario);
      navigate("/main");
    } catch (error) {
      setErroLogin(true);
    }
  }

  return (
    <div className='login-container-geral'>
      <div className='login-imagem-container'>
        <span>Gerencie todos os pagamentos da sua empresa em um só lugar.</span>
      </div>

      <div className='login-container'>
        <div className='dados-login-cadastro-container'>
          <h2>Faca seu Login!</h2>
          <form>
            <label>
              E-mail
              <input value={formCadastroUsuario.email} type='text' name='email' onChange={handleChangeInput} />
            </label>
            <label className='position-relative'>
              Senha
              <input value={formCadastroUsuario.senha} type='password' name='senha' onChange={handleChangeInput} />
              <span className='position-absolute esqueceu-a-senha'>Esqueceu a senha?</span>
              {erroLogin && <span className='position-absolute erro-login'>Usuário e/ou senha incorretos</span>}
            </label>
            <button type='button' onClick={(e) => handleSubmitLogin(e)}>
              Entrar
            </button>
          </form>
          <span>
            Ainda não possui uma conta?{" "}
            <strong type='button' onClick={() => navigate("/cadastro")}>
              Cadastre-se
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
