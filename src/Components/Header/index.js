import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import iconeEditar from "../../Assets/arrow/icone-editar.svg";
import iconeSair from "../../Assets/arrow/icone-sair.svg";
import arrowDown from "../../Assets/nav-menu/arrow-down.svg";
import useGlobal from "../../hooks/useGlobal";
import api from "../../Services/api";
import clearUserData from "../../Utils/clearUserData";
import { getItem, storageClear, setItem } from "../../Utils/storage";
import "./styles.css";
import ModalEditUser from "../../Components/Main/ModalEditUser";

function Header({ titulo, classeTitulo, titulo2, classeTitulo2 }) {
  useEffect(() => {
    function updateUserName() {
      const nomeUsuario = getItem("userName");

      setNomeUsuario(nomeUsuario);
    }
    getUserName();
    updateUserName();
    // eslint-disable-next-line
  }, []);

  const { editLogoutUser, setEditLogoutUser } = useGlobal();
  const { setEditUser } = useGlobal();
  const { formCadastroUsuario, setFormCadastroUsuario } = useGlobal();
  const [nomeUsuario, setNomeUsuario] = useState();

  const navigate = useNavigate();

  function handleOpenModalLogout() {
    setEditLogoutUser(!editLogoutUser);
  }

  function handleOpenModalEditUser() {
    setEditUser(true);
    getUserId();
  }

  async function getUserName() {
    const token = getItem("token");
    const IdUsuario = getItem("userId");
    try {
      const response = await api.get(`/user/${IdUsuario} `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data[0];

      const { name } = responseData;

      setItem("userName", name);
    } catch (error) {}
  }

  async function getUserId() {
    const token = getItem("token");
    const IdUsuario = getItem("userId");
    try {
      const response = await api.get(`/user/${IdUsuario} `, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data[0];

      const { password, ...dadosUsuario } = responseData;

      const localForm = { ...dadosUsuario };

      setFormCadastroUsuario({ ...localForm });
    } catch (error) {}
  }

  function handleLogout() {
    setEditLogoutUser(false);
    clearUserData(formCadastroUsuario, setFormCadastroUsuario);
    storageClear();
    navigate("/login");
  }

  return (
    <header>
      <div className="header-container-titulo">
        <span className={classeTitulo}>{titulo}</span>
        {titulo2 && <span className={classeTitulo2}> {titulo2}</span>}
      </div>

      <div className="header-container-usuario">
        <div className="circle-user"></div>
        <span className="header-nome-usuario">{nomeUsuario}</span>
        <img
          onClick={() => handleOpenModalLogout()}
          src={arrowDown}
          alt="foto-perfil"
        ></img>
        {editLogoutUser && (
          <>
            <div className="div-menu-rotate"></div>
            <div className="modal-edit-logout">
              <img
                onClick={() => handleOpenModalEditUser()}
                src={iconeEditar}
                alt="icone-editar"
              />
              <img
                onClick={() => handleLogout()}
                src={iconeSair}
                alt="icone-sair"
              />
            </div>
          </>
        )}
      </div>
      <ModalEditUser></ModalEditUser>
    </header>
  );
}

export default Header;
