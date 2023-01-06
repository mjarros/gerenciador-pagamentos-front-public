import { useEffect, useState } from "react";
import arrows from "../../../Assets/clientes/tabelaClientes/arrows.svg";
import setaDireitaPreta from "../../../Assets/clientes/tabelaClientes/seta-direita-preta.svg";
import setaEsquerdaPreta from "../../../Assets/clientes/tabelaClientes/seta-esquerda-preta.svg";
import editarCobranca from "../../../Assets/detalhes-cliente/cobrancas-cliente/editar-cobranca.svg";
import excluirCobranca from "../../../Assets/detalhes-cliente/cobrancas-cliente/excluir-cobranca.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";
import erroBuscaCliente from "../../../Assets/cobrancas/tabela-cobrancas/erro-busca-cliente.svg";
import erroBuscaLupa from "../../../Assets/cobrancas/tabela-cobrancas/erro-busca-lupa.svg";

function TabelaCobrancas() {
  const token = getItem("token");

  const { localArrayCobrancas, setLocalArrayCobrancas } = useGlobal();
  const [paginaExibir, setPaginaExibir] = useState(0);
  const { cobrancasExibir, setCobrancasExibir } = useGlobal();
  const { setModalEditarCobranca } = useGlobal();
  const { setModalExcluirCobranca } = useGlobal();
  const { setFormCadastroCobranca } = useGlobal();
  const { setFormEditarCobranca } = useGlobal();
  const { setNomeClienteCobranca } = useGlobal();
  const { setModalDetalhesCobranca } = useGlobal();
  const { localArrayClientes, setLocalArrayClientes } = useGlobal();
  const { buscaCobranca } = useGlobal();
  const { buscaCobrancaErro } = useGlobal();
  const [
    ordencaoCobrancasClienteCrescente,
    setOrdenacaoCobrancasClienteCresce,
  ] = useState(true);
  const [ordencaoCobrancasIDCrescente, setOrdenacaoCobrancasIDCrescente] =
    useState(true);

  const { arrayCobrancasFilter, setArrayCobrancasFilter } = useGlobal();
  const { arrayCobrancasFilterExibir, setArrayCobrancasFilterExibir } =
    useGlobal();

  useEffect(() => {
    atualizarTabelaCobrancas();
    atualizarTabelaClientes();
    //eslint-disable-next-line
  }, []);

  async function atualizarTabelaCobrancas() {
    const resposta = await api.get("/collection/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const novoArrayCobrancas = [...resposta.data];

    const novaOrdenacaoCobrancas = novoArrayCobrancas.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setLocalArrayCobrancas(novaOrdenacaoCobrancas);

    setCobrancasExibir(novaOrdenacaoCobrancas.slice(0, 10));

    setOrdenacaoCobrancasClienteCresce(false);
  }

  async function atualizarTabelaClientes() {
    const resposta = await api.get("/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalArrayClientes(resposta.data);
  }

  function handleTipoOrdenacaoCliente() {
    const novoArrayCobrancas = [...localArrayCobrancas];

    if (ordencaoCobrancasClienteCrescente) {
      const novaOrdenacaoCobrancas = novoArrayCobrancas.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

      setLocalArrayCobrancas(novaOrdenacaoCobrancas);

      setCobrancasExibir(novaOrdenacaoCobrancas.slice(0, 10));

      setOrdenacaoCobrancasClienteCresce(false);
    }

    if (ordencaoCobrancasClienteCrescente && buscaCobranca !== "") {
      const novaOrdenacaoCobrancas = arrayCobrancasFilter.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });

      setArrayCobrancasFilter(novaOrdenacaoCobrancas);

      setArrayCobrancasFilterExibir(novaOrdenacaoCobrancas);
      novaOrdenacaoCobrancas.slice(0, 10);

      setOrdenacaoCobrancasClienteCresce(false);
    }

    if (!ordencaoCobrancasClienteCrescente) {
      const novaOrdenacaoCobrancas = novoArrayCobrancas.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setLocalArrayCobrancas(novaOrdenacaoCobrancas);

      setCobrancasExibir(novaOrdenacaoCobrancas.slice(0, 10));

      setOrdenacaoCobrancasClienteCresce(true);
    }

    if (!ordencaoCobrancasClienteCrescente && buscaCobranca !== "") {
      const novaOrdenacaoCobrancas = arrayCobrancasFilter.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setArrayCobrancasFilter(novaOrdenacaoCobrancas);

      setArrayCobrancasFilterExibir(novaOrdenacaoCobrancas);
      novaOrdenacaoCobrancas.slice(0, 10);

      setOrdenacaoCobrancasClienteCresce(true);
    }
  }

  function handleTipoOrdenacaoID() {
    const novoArrayCobrancas = [...localArrayCobrancas];

    if (ordencaoCobrancasIDCrescente) {
      const novaOrdenacaoCobrancas = novoArrayCobrancas.sort((a, b) => {
        return b.id - a.id;
      });

      setLocalArrayCobrancas(novaOrdenacaoCobrancas);

      setCobrancasExibir(novaOrdenacaoCobrancas.slice(0, 10));

      setOrdenacaoCobrancasIDCrescente(false);
    }

    if (ordencaoCobrancasIDCrescente && buscaCobranca !== "") {
      const novaOrdenacaoCobrancas = arrayCobrancasFilter.sort((a, b) => {
        return b.id - a.id;
      });

      setArrayCobrancasFilter(novaOrdenacaoCobrancas);

      setArrayCobrancasFilterExibir(novaOrdenacaoCobrancas);
      novaOrdenacaoCobrancas.slice(0, 10);

      setOrdenacaoCobrancasIDCrescente(false);
    }

    if (!ordencaoCobrancasIDCrescente) {
      const novaOrdenacaoCobrancas = novoArrayCobrancas.sort((a, b) => {
        return a.id - b.id;
      });

      setLocalArrayCobrancas(novaOrdenacaoCobrancas);

      setCobrancasExibir(novaOrdenacaoCobrancas.slice(0, 10));

      setOrdenacaoCobrancasIDCrescente(true);
    }

    if (!ordencaoCobrancasIDCrescente && buscaCobranca !== "") {
      const novaOrdenacaoCobrancas = arrayCobrancasFilter.sort((a, b) => {
        return a.id - b.id;
      });

      setArrayCobrancasFilter(novaOrdenacaoCobrancas);

      setArrayCobrancasFilterExibir(novaOrdenacaoCobrancas);
      novaOrdenacaoCobrancas.slice(0, 10);

      setOrdenacaoCobrancasIDCrescente(true);
    }
  }

  function handleClientesExibidosPrev() {
    if (paginaExibir <= 0) {
      return;
    }
    setPaginaExibir(paginaExibir - 10);

    const novoArray = localArrayCobrancas.slice(
      paginaExibir - 10,
      paginaExibir
    );

    setCobrancasExibir(novoArray);
  }

  function handleClientesExibidosNext() {
    if (paginaExibir > localArrayCobrancas.length - 10) {
      return;
    }

    setPaginaExibir(paginaExibir + 10);

    const novoArray = localArrayCobrancas.slice(
      paginaExibir + 10,
      paginaExibir + 20
    );

    setCobrancasExibir(novoArray);
  }

  function handleEditarCobranca(id) {
    const cobranca = localArrayCobrancas.find((cobranca) => {
      return parseInt(cobranca.id) === parseInt(id);
    });

    setFormEditarCobranca({
      ...cobranca,
      expiration_date: new Date(cobranca.expiration_date).toLocaleDateString(
        "sv-SE"
      ),
    });
    setModalEditarCobranca(true);
  }

  function handleExcluirCobranca(id) {
    const cobranca = localArrayCobrancas.find((cobranca) => {
      return parseInt(cobranca.id) === parseInt(id);
    });

    setFormCadastroCobranca({
      ...cobranca,
    });
    setModalExcluirCobranca(true);
  }

  function handleDetalhesCobranca(id, clientId) {
    const cobranca = localArrayCobrancas.find((cobranca) => {
      return parseInt(cobranca.id) === parseInt(id);
    });

    setFormCadastroCobranca({
      ...cobranca,
    });

    const cliente = localArrayClientes.find((cliente) => {
      return parseInt(cliente.id) === parseInt(clientId);
    });

    setNomeClienteCobranca(cliente.name);
    setModalDetalhesCobranca(true);
  }

  function CobrancasMap() {
    return cobrancasExibir.map((cobranca) => (
      <div key={cobranca.id} className="div-tabela-cobrancas">
        <span
          onClick={() =>
            handleDetalhesCobranca(cobranca.id, cobranca.clients_collection_id)
          }
          className="dados width-15rem"
          style={{
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            wordWrap: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          {cobranca.name}
        </span>
        <span className="dados width-5rem">{cobranca.id}</span>
        <span className="dados width-10rem">
          R$ {parseInt(cobranca.value).toFixed(2)}
        </span>
        <span className="dados width-10rem">
          {new Date(cobranca.expiration_date).toLocaleDateString()}
        </span>
        {cobranca.billing_status === true && (
          <span className="status adimplente width-7rem">Paga</span>
        )}
        {cobranca.billing_status === false &&
        new Date(cobranca.expiration_date) >= new Date() ? (
          <span className="status pendente width-7rem">Pendente</span>
        ) : (
          cobranca.billing_status === false && (
            <span className="status inadimplente width-7rem">Vencida</span>
          )
        )}
        <span
          style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          className="dados width-15rem"
        >
          {cobranca.description}
        </span>
        <div>
          <img
            onClick={() => handleEditarCobranca(cobranca.id)}
            src={editarCobranca}
            alt="imagem-adicionar-cobranca"
          ></img>
          <img
            onClick={() => handleExcluirCobranca(cobranca.id)}
            src={excluirCobranca}
            alt="imagem-adicionar-cobranca"
          ></img>
        </div>
      </div>
    ));
  }

  function CobrancasMapFilter() {
    return arrayCobrancasFilterExibir.map((cobranca) => (
      <div key={cobranca.id} className="div-tabela-cobrancas">
        <span
          onClick={() =>
            handleDetalhesCobranca(cobranca.id, cobranca.clients_collection_id)
          }
          className="dados width-15rem"
          style={{
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            wordWrap: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer",
          }}
        >
          {cobranca.name}
        </span>
        <span className="dados width-5rem">{cobranca.id}</span>
        <span className="dados width-10rem">
          R$ {parseInt(cobranca.value).toFixed(2)}
        </span>
        <span className="dados width-10rem">
          {new Date(cobranca.expiration_date).toLocaleDateString()}
        </span>
        {cobranca.billing_status === true && (
          <span className="status adimplente width-7rem">Paga</span>
        )}
        {cobranca.billing_status === false &&
        new Date(cobranca.expiration_date) >= new Date() ? (
          <span className="status pendente width-7rem">Pendente</span>
        ) : (
          cobranca.billing_status === false && (
            <span className="status inadimplente width-7rem">Vencida</span>
          )
        )}
        <span
          style={{ justifyContent: "flex-start", alignItems: "flex-start" }}
          className="dados width-15rem"
        >
          {cobranca.description}
        </span>
        <div>
          <img
            onClick={() => handleEditarCobranca(cobranca.id)}
            src={editarCobranca}
            alt="imagem-adicionar-cobranca"
          ></img>
          <img
            onClick={() => handleExcluirCobranca(cobranca.id)}
            src={excluirCobranca}
            alt="imagem-adicionar-cobranca"
          ></img>
        </div>
      </div>
    ));
  }

  function CobrancasErroBusca() {
    return (
      <div className="modal-erro-busca-cobrancas">
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
      <div className="cobrancas-display-container">
        <div className="cobrancas-display-cabecalho">
          <span className="margin-right-3rem">
            <img
              style={{ cursor: "pointer" }}
              onClick={() => handleTipoOrdenacaoCliente()}
              src={arrows}
              alt="arrows"
            />
            Cliente
          </span>
          <span>
            <img
              style={{ cursor: "pointer" }}
              onClick={() => handleTipoOrdenacaoID()}
              src={arrows}
              alt="arrows"
            />
            ID Cob.
          </span>
          <span>Valor</span>
          <span className="margin-right-2rem">Data Venc.</span>
          <span className="margin-right-1rem">Status</span>
          <span>Descrição</span>
        </div>
        {buscaCobranca === "" && <CobrancasMap />}
        {buscaCobranca !== "" && <CobrancasMapFilter />}
        {buscaCobrancaErro === true && buscaCobranca !== "" ? (
          <CobrancasErroBusca />
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

export default TabelaCobrancas;
