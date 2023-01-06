import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrows from "../../../Assets/clientes/tabelaClientes/arrows.svg";
import cobrarCliente from "../../../Assets/clientes/tabelaClientes/cobrar-cliente.svg";
import setaDireitaPreta from "../../../Assets/clientes/tabelaClientes/seta-direita-preta.svg";
import setaEsquerdaPreta from "../../../Assets/clientes/tabelaClientes/seta-esquerda-preta.svg";
import erroBuscaCliente from "../../../Assets/cobrancas/tabela-cobrancas/erro-busca-cliente.svg";
import erroBuscaLupa from "../../../Assets/cobrancas/tabela-cobrancas/erro-busca-lupa.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function TabelaClientes() {
  const navigate = useNavigate();

  const token = getItem("token");

  const { localArrayClientes, setLocalArrayClientes } = useGlobal();
  const [paginaExibir, setPaginaExibir] = useState(0);
  const { clientesExibir, setClientesExibir } = useGlobal();
  const { setModalCadastroCobranca } = useGlobal();
  const { formCadastroCobranca, setFormCadastroCobranca } = useGlobal();
  const [ordencaoCrescente, setOrdenacaoCresce] = useState(true);

  const { buscaClientes } = useGlobal();
  const { buscaClientesErro } = useGlobal();

  const { arrayClientesFilter, setArrayClientesFilter } = useGlobal();
  const { arrayClientesFilterExibir, setArrayClientesFilterExibir } =
    useGlobal();

  useEffect(() => {
    atualizarTabela();
    //eslint-disable-next-line
  }, []);

  async function atualizarTabela() {
    const resposta = await api.get("/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const novoArrayClientes = [...resposta.data];

    const ordenacaoCrescenteArrayClientes = novoArrayClientes.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setLocalArrayClientes(ordenacaoCrescenteArrayClientes);

    setClientesExibir(ordenacaoCrescenteArrayClientes.slice(0, 10));
  }

  function handleTipoOrdenacao() {
    const novoArrayClientes = [...localArrayClientes];
    const novoArrayClientesFilter = [...arrayClientesFilter];

    if (ordencaoCrescente) {
      const novaOrdenacaoClientes = novoArrayClientes.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

      setLocalArrayClientes(novaOrdenacaoClientes);

      setClientesExibir(novaOrdenacaoClientes.slice(0, 10));

      setOrdenacaoCresce(false);
    }

    if (ordencaoCrescente && buscaClientesErro === false) {
      const novaOrdenacaoClientesFilter = novoArrayClientesFilter.sort(
        (a, b) => {
          return b.name.localeCompare(a.name);
        }
      );

      setArrayClientesFilter(novaOrdenacaoClientesFilter);
      setArrayClientesFilterExibir(novaOrdenacaoClientesFilter.slice(0, 10));

      setOrdenacaoCresce(false);
    }

    if (!ordencaoCrescente) {
      const novaOrdenacaoClientes = novoArrayClientes.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setLocalArrayClientes(novaOrdenacaoClientes);

      setClientesExibir(novaOrdenacaoClientes.slice(0, 10));

      setOrdenacaoCresce(true);
    }

    if (!ordencaoCrescente && buscaClientesErro === false) {
      const novaOrdenacaoClientesFilter = novoArrayClientesFilter.sort(
        (a, b) => {
          return a.name.localeCompare(b.name);
        }
      );

      setArrayClientesFilter(novaOrdenacaoClientesFilter);
      setArrayClientesFilterExibir(novaOrdenacaoClientesFilter.slice(0, 10));

      setOrdenacaoCresce(true);
    }
  }

  function handleClientesExibidosPrev() {
    if (buscaClientes !== "") {
      if (paginaExibir <= 0) {
        return;
      }
      setPaginaExibir(paginaExibir - 10);

      const novoArray = arrayClientesFilter.slice(
        paginaExibir - 10,
        paginaExibir
      );

      setArrayClientesFilterExibir(novoArray);
    }

    if (paginaExibir <= 0) {
      return;
    }
    setPaginaExibir(paginaExibir - 10);

    const novoArray = localArrayClientes.slice(paginaExibir - 10, paginaExibir);

    setClientesExibir(novoArray);
  }

  function handleClientesExibidosNext() {
    if (buscaClientes !== "") {
      if (paginaExibir > arrayClientesFilter.length - 10) {
        return;
      }

      setPaginaExibir(paginaExibir + 10);

      const novoArray = arrayClientesFilter.slice(
        paginaExibir + 10,
        paginaExibir + 20
      );

      setArrayClientesFilterExibir(novoArray);
    }

    if (paginaExibir > localArrayClientes.length - 10) {
      return;
    }

    setPaginaExibir(paginaExibir + 10);

    const novoArray = localArrayClientes.slice(
      paginaExibir + 10,
      paginaExibir + 20
    );

    setClientesExibir(novoArray);
  }

  function handleAdicionarCobranca(name, id) {
    setFormCadastroCobranca({
      ...formCadastroCobranca,
      name,
      clients_collection_id: id,
    });
    setModalCadastroCobranca(true);
  }

  function ClientesMap() {
    return clientesExibir.map((cliente) => (
      <div key={cliente.id} className="div-tabela-cliente">
        <span
          onClick={() => navigate(`/clientes/detalhes-cliente/${cliente.id}`)}
          className="dados alinhar-esquerda"
          style={{
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            wordWrap: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          {cliente.name}
        </span>
        <span
          style={{ justifyContent: "flex-start" }}
          className="dados margin-right-2rem"
        >
          {cliente.cpf}
        </span>
        <span className="dados margin-right-2rem alinhar-esquerda">
          {cliente.email}
        </span>
        <span
          style={{ justifyContent: "flex-start" }}
          className="dados margin-right-3rem"
        >
          {cliente.phone}
        </span>
        {cliente.status_clients === true ? (
          <span className="status adimplente">Adimplente</span>
        ) : (
          <span className="status inadimplente">Inadimplente</span>
        )}
        <img
          onClick={() => handleAdicionarCobranca(cliente.name, cliente.id)}
          src={cobrarCliente}
          alt="imagem-adicionar-cobranca"
        ></img>
      </div>
    ));
  }

  function ClientesMapFilter() {
    return arrayClientesFilterExibir.map((cliente) => (
      <div key={cliente.id} className="div-tabela-cliente">
        <span
          onClick={() => navigate(`/clientes/detalhes-cliente/${cliente.id}`)}
          className="dados alinhar-esquerda"
          style={{
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            wordWrap: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          {cliente.name}
        </span>
        <span
          style={{ justifyContent: "flex-start" }}
          className="dados margin-right-2rem"
        >
          {cliente.cpf}
        </span>
        <span className="dados margin-right-2rem alinhar-esquerda">
          {cliente.email}
        </span>
        <span
          style={{ justifyContent: "flex-start" }}
          className="dados margin-right-3rem"
        >
          {cliente.phone}
        </span>
        {cliente.status_clients === true ? (
          <span className="status adimplente">Adimplente</span>
        ) : (
          <span className="status inadimplente">Inadimplente</span>
        )}
        <img
          onClick={() => handleAdicionarCobranca(cliente.name, cliente.id)}
          src={cobrarCliente}
          alt="imagem-adicionar-cobranca"
        ></img>
      </div>
    ));
  }

  function ClientesErroBusca() {
    return (
      <div className="modal-erro-busca-clientes">
        <img
          className="img-cliente"
          src={erroBuscaCliente}
          alt="erro-busca-cliente"
        />
        <img className="img-lupa" src={erroBuscaLupa} alt="erro-busca-lupa" />

        <span className="nenhum-resultado">
          Nenhum resultado foi encontrado!
        </span>
        <span className="verifique-escrita">
          Verifique se escrita está correta
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="clientes-display-container">
        <div className="clintes-display-cabecalho">
          <span>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => handleTipoOrdenacao()}
              src={arrows}
              alt="arrows"
            />{" "}
            Cliente
          </span>
          <span className="margin-left-6rem">CPF</span>
          <span className="margin-left-6rem">E-mail</span>
          <span className="margin-left-6rem">Telefone</span>
          <span className="margin-left-6rem">Status</span>
          <span>Criar Cobranca</span>
        </div>
        {buscaClientes === "" && <ClientesMap />}
        {buscaClientes !== "" && <ClientesMapFilter />}
        {buscaClientesErro === true && buscaClientes !== "" ? (
          <ClientesErroBusca />
        ) : (
          ""
        )}
      </div>
      <div className="setas-paginacao">
        <img
          onClick={() => handleClientesExibidosPrev()}
          src={setaEsquerdaPreta}
          alt="seta-esquerda"
        ></img>
        <img
          onClick={() => handleClientesExibidosNext()}
          src={setaDireitaPreta}
          alt="seta-direita"
        ></img>
      </div>
    </>
  );
}

export default TabelaClientes;
