import "./styles.css";
import useGlobal from "../../../hooks/useGlobal";
import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { getItem, setItem } from "../../../Utils/storage";
import { useNavigate } from "react-router-dom";

function DisplayCobrancas() {
  useEffect(() => {
    atualizarTabelaCobrancasECobrancasVencidas();
    //eslint-disable-next-line
  }, []);

  const token = getItem("token");

  const { localArrayCobrancas, setLocalArrayCobrancas } = useGlobal();
  const [cobrancasVencidas, setCobrancasVencidas] = useState([]);
  const [qtdCobrancasVencidas, setQtdCobrancasVencidas] = useState(null);

  const [cobrancasPrevistas, setCobrancasPrevistas] = useState([]);
  const [qtdCobrancasPrevistas, setQtdCobrancasPrevistas] = useState(null);

  const [cobrancasPagas, setCobrancasPagas] = useState([]);
  const [qtdCobrancasPagas, setQtdCobrancasPagas] = useState(null);

  const { setBuscaCobranca } = useGlobal();

  const { setBuscaCobrancaErro } = useGlobal();

  const { setArrayCobrancasFilter } = useGlobal();

  const { setArrayCobrancasFilterExibir } = useGlobal();

  const navigate = useNavigate();

  async function atualizarTabelaCobrancasECobrancasVencidas() {
    const resposta = await api.get("/collection/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalArrayCobrancas(resposta.data);

    const localArray = [...resposta.data];

    const newDisplay = localArray.filter((cobranca) => {
      return (
        cobranca.billing_status === false &&
        new Date(cobranca.expiration_date) < new Date()
      );
    });

    setQtdCobrancasVencidas(newDisplay.length);
    setCobrancasVencidas([...newDisplay.slice(0, 6)]);

    const newDisplay2 = localArray.filter((cobranca) => {
      return (
        cobranca.billing_status === false &&
        new Date(cobranca.expiration_date) > new Date()
      );
    });

    setQtdCobrancasPrevistas(newDisplay2.length);
    setCobrancasPrevistas([...newDisplay2.slice(0, 6)]);

    const newDisplay3 = localArray.filter((cobranca) => {
      return cobranca.billing_status === true;
    });

    setQtdCobrancasPagas(newDisplay3.length);
    setCobrancasPagas([...newDisplay3.slice(0, 6)]);
  }

  function handleNavigateFilterCobrancasVencidas() {
    setBuscaCobranca("vencidas");

    const newArray = [...localArrayCobrancas];

    const newArrayFilter = newArray.filter((cobrancas) => {
      return (
        cobrancas.billing_status === false &&
        new Date(cobrancas.expiration_date) < new Date()
      );
    });

    if (newArrayFilter.length <= 0) {
      setBuscaCobrancaErro(true);
    } else {
      setBuscaCobrancaErro(false);
    }

    setArrayCobrancasFilter(newArrayFilter);
    setArrayCobrancasFilterExibir(newArrayFilter.slice(0, 10));

    setItem("pagina", "cobrancas");
    navigate("/cobrancas");
  }

  function handleNavigateFilterCobrancasPrevistas() {
    setBuscaCobranca("previstas");

    const newArray = [...localArrayCobrancas];

    const newArrayFilter = newArray.filter((cobrancas) => {
      return (
        cobrancas.billing_status === false &&
        new Date(cobrancas.expiration_date) > new Date()
      );
    });

    if (newArrayFilter.length <= 0) {
      setBuscaCobrancaErro(true);
    } else {
      setBuscaCobrancaErro(false);
    }

    setArrayCobrancasFilter(newArrayFilter);
    setArrayCobrancasFilterExibir(newArrayFilter.slice(0, 10));

    setItem("pagina", "cobrancas");
    navigate("/cobrancas");
  }

  function handleNavigateFilterCobrancasPagas() {
    setBuscaCobranca("pagas");

    const newArray = [...localArrayCobrancas];

    const newArrayFilter = newArray.filter((cobrancas) => {
      return cobrancas.billing_status === true;
    });

    if (newArrayFilter.length <= 0) {
      setBuscaCobrancaErro(true);
    } else {
      setBuscaCobrancaErro(false);
    }

    setArrayCobrancasFilter(newArrayFilter);
    setArrayCobrancasFilterExibir(newArrayFilter.slice(0, 10));

    setItem("pagina", "cobrancas");
    navigate("/cobrancas");
  }

  function CobrancasVencidas() {
    return cobrancasVencidas.map((cobranca) => (
      <div className="container-individual-linha" key={cobranca.id}>
        <span style={{ width: "10rem", textAlign: "left" }}>
          {cobranca.name}
        </span>
        <span style={{ width: "10rem", textAlign: "center" }}>
          {cobranca.id}
        </span>
        <span
          style={{ width: "10rem", textAlign: "center", paddingLeft: "2rem" }}
        >
          R$ {cobranca.value}
        </span>
      </div>
    ));
  }

  function CobrancasPrevistas() {
    return cobrancasPrevistas.map((cobranca) => (
      <div className="container-individual-linha" key={cobranca.id}>
        <span style={{ width: "10rem", textAlign: "left" }}>
          {cobranca.name}
        </span>
        <span style={{ width: "10rem", textAlign: "center" }}>
          {cobranca.id}
        </span>
        <span
          style={{ width: "10rem", textAlign: "center", paddingLeft: "2rem" }}
        >
          R$ {cobranca.value}
        </span>
      </div>
    ));
  }

  function CobrancasPagas() {
    return cobrancasPagas.map((cobranca) => (
      <div className="container-individual-linha" key={cobranca.id}>
        <span style={{ width: "10rem", textAlign: "left" }}>
          {cobranca.name}
        </span>
        <span style={{ width: "10rem", textAlign: "center" }}>
          {cobranca.id}
        </span>
        <span
          style={{ width: "10rem", textAlign: "center", paddingLeft: "2rem" }}
        >
          R$ {cobranca.value}
        </span>
      </div>
    ));
  }

  return (
    <div className="container-geral-display-cobrancas">
      <div className="container-individual-display-cobrancas">
        <div className="container-individual-titulo">
          <h3>Cobranças Vencidas</h3>
          <span className="cobranca-cor-vermelho">{qtdCobrancasVencidas}</span>
        </div>
        <div className="container-individual-cabecalho">
          <span>Cliente</span>
          <span>ID da cob.</span>
          <span>Valor</span>
        </div>
        <div className="container-individual-informacoes">
          <CobrancasVencidas />
        </div>
        <span
          onClick={() => handleNavigateFilterCobrancasVencidas()}
          className="container-individual-display-cobrancas-ver-todos"
        >
          Ver todos
        </span>
      </div>
      <div className="container-individual-display-cobrancas">
        <div className="container-individual-titulo">
          <h3>Cobranças Previstas</h3>
          <span className="cobranca-cor-amarelo">{qtdCobrancasPrevistas}</span>
        </div>
        <div className="container-individual-cabecalho">
          <span>Cliente</span>
          <span>ID da cob.</span>
          <span>Valor</span>
        </div>
        <div className="container-individual-informacoes">
          <CobrancasPrevistas />
        </div>
        <span
          onClick={() => handleNavigateFilterCobrancasPrevistas()}
          className="container-individual-display-cobrancas-ver-todos"
        >
          Ver todos
        </span>
      </div>
      <div className="container-individual-display-cobrancas">
        <div className="container-individual-titulo">
          <h3>Cobranças Pagas</h3>
          <span className="cobranca-cor-azul">{qtdCobrancasPagas}</span>
        </div>
        <div className="container-individual-cabecalho">
          <span>Cliente</span>
          <span>ID da cob.</span>
          <span>Valor</span>
        </div>
        <div className="container-individual-informacoes">
          <CobrancasPagas />
        </div>
        <span
          onClick={() => handleNavigateFilterCobrancasPagas()}
          className="container-individual-display-cobrancas-ver-todos"
        >
          Ver todos
        </span>
      </div>
    </div>
  );
}

export default DisplayCobrancas;
