import { useState } from "react";

function useGlobalProvider() {
  const [formCadastroUsuario, setFormCadastroUsuario] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [formCadastroCliente, setFormCadastroCliente] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    adress: "",
    complement: "",
    zip_code: "",
    district: "",
    city: "",
    state: "",
    status_clients: false,
  });

  const [editLogoutUser, setEditLogoutUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [localArrayClientes, setLocalArrayClientes] = useState([]);
  const [adicionarCliente, setAdicionarCliente] = useState(false);

  const [cadastroClienteConcluido, setCadastroClienteConcluido] =
    useState(false);

  const [editarClienteConcluido, setEditarClienteConcluido] = useState(false);

  const [localCliente, setLocalCliente] = useState({});
  const [editarCliente, setEditarCliente] = useState(false);

  const [formCadastroCobranca, setFormCadastroCobranca] = useState({
    id: "",
    name: "",
    description: "",
    expiration_date: "",
    value: "",
    billing_status: false,
    clients_collection_id: "",
  });

  const [formEditarCobranca, setFormEditarCobranca] = useState({
    id: "",
    name: "",
    description: "",
    expiration_date: "",
    value: "",
    billing_status: false,
    clients_collection_id: "",
  });

  const [modalCadastroCobranca, setModalCadastroCobranca] = useState(false);
  const [modalCadastroCobrancaConcluido, setModalCadastroCobrancaConcluido] =
    useState(false);
  const [modalEditarCobranca, setModalEditarCobranca] = useState(false);
  const [modalEditarCobrancaConcluido, setModalEditarCobrancaConcluido] =
    useState(false);

  const [modalExcluirCobrancaErro, setModalExcluirCobrancaErro] =
    useState(false);

  const [modalExcluirCobranca, setModalExcluirCobranca] = useState(false);
  const [modalExcluirCobrancaConcluido, setModalExcluirCobrancaConcluido] =
    useState(false);

  const [localArrayCobrancas, setLocalArrayCobrancas] = useState([]);
  const [cobrancasExibir, setCobrancasExibir] = useState([]);

  const [modalDetalhesCobranca, setModalDetalhesCobranca] = useState(false);

  const [nomeClienteCobranca, setNomeClienteCobranca] = useState("");

  const [localCobrancasCliente, setLocalCobrancasCliente] = useState([]);

  const [buscaCobranca, setBuscaCobranca] = useState("");

  const [buscaCobrancaErro, setBuscaCobrancaErro] = useState(false);

  const [arrayCobrancasFilter, setArrayCobrancasFilter] = useState([]);

  const [arrayCobrancasFilterExibir, setArrayCobrancasFilterExibir] = useState(
    []
  );

  const [buscaClientes, setBuscaClientes] = useState("");

  const [buscaClientesErro, setBuscaClientesErro] = useState(false);

  const [arrayClientesFilter, setArrayClientesFilter] = useState([]);

  const [arrayClientesFilterExibir, setArrayClientesFilterExibir] = useState(
    []
  );

  const [clientesExibir, setClientesExibir] = useState([]);

  return {
    formCadastroUsuario,
    setFormCadastroUsuario,
    activeStep,
    setActiveStep,
    editLogoutUser,
    setEditLogoutUser,
    editUser,
    setEditUser,
    localArrayClientes,
    setLocalArrayClientes,
    adicionarCliente,
    setAdicionarCliente,
    formCadastroCliente,
    setFormCadastroCliente,
    cadastroClienteConcluido,
    setCadastroClienteConcluido,
    localCliente,
    setLocalCliente,
    editarCliente,
    setEditarCliente,
    editarClienteConcluido,
    setEditarClienteConcluido,
    formCadastroCobranca,
    setFormCadastroCobranca,
    modalCadastroCobranca,
    setModalCadastroCobranca,
    modalCadastroCobrancaConcluido,
    setModalCadastroCobrancaConcluido,
    modalEditarCobranca,
    setModalEditarCobranca,
    modalEditarCobrancaConcluido,
    setModalEditarCobrancaConcluido,
    modalExcluirCobranca,
    setModalExcluirCobranca,
    modalExcluirCobrancaConcluido,
    setModalExcluirCobrancaConcluido,
    localArrayCobrancas,
    setLocalArrayCobrancas,
    cobrancasExibir,
    setCobrancasExibir,
    modalExcluirCobrancaErro,
    setModalExcluirCobrancaErro,
    modalDetalhesCobranca,
    setModalDetalhesCobranca,
    nomeClienteCobranca,
    setNomeClienteCobranca,
    localCobrancasCliente,
    setLocalCobrancasCliente,
    formEditarCobranca,
    setFormEditarCobranca,
    buscaCobranca,
    setBuscaCobranca,
    buscaClientes,
    setBuscaClientes,
    arrayCobrancasFilter,
    setArrayCobrancasFilter,
    buscaCobrancaErro,
    setBuscaCobrancaErro,
    buscaClientesErro,
    setBuscaClientesErro,
    arrayClientesFilter,
    setArrayClientesFilter,
    clientesExibir,
    setClientesExibir,
    arrayClientesFilterExibir,
    setArrayClientesFilterExibir,
    arrayCobrancasFilterExibir,
    setArrayCobrancasFilterExibir,
  };
}

export default useGlobalProvider;
