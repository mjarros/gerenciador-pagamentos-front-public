import "./styles.css";
import useGlobal from "../../../hooks/useGlobal";
import { useEffect, useState } from "react";
import api from "../../../Services/api";
import { getItem, setItem } from "../../../Utils/storage";
import imgClientesAdimplentes from "../../../Assets/main/clientes_adimplentes.svg";
import imgClientesInadimplentes from "../../../Assets/main/clientes_inadimplentes.svg";
import { useNavigate } from "react-router-dom";

function DisplayClientes() {
  useEffect(() => {
    atualizarTabelaCobrancasECobrancasAtrasadasEEmDia();
    atualizarTabelaClientes();
    //eslint-disable-next-line
  }, []);

  const navigate = useNavigate();

  const token = getItem("token");

  const { setLocalArrayCobrancas } = useGlobal();
  const [clientesInadimplentes, setClientesInadimplentes] = useState([]);

  const [qtdClientesInadimplentes, setQtdClientesInadimplentes] =
    useState(null);

  const [clientesAdimplentes, setClientesAdimplentes] = useState([]);
  const [qtdClientesAdimplentes, setQtdClientesAdimplentes] = useState(null);

  const { setLocalArrayClientes } = useGlobal();
  const { setClientesExibir } = useGlobal();

  const { setBuscaClientes } = useGlobal();

  const { setBuscaClientesErro } = useGlobal();

  const { setArrayClientesFilter } = useGlobal();

  const { localArrayClientes } = useGlobal();
  const { setArrayClientesFilterExibir } = useGlobal();

  async function atualizarTabelaClientes() {
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

  async function atualizarTabelaCobrancasECobrancasAtrasadasEEmDia() {
    const resposta = await api.get("/collection/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalArrayCobrancas(resposta.data);

    const localArray = [...resposta.data];

    const cobrancasAtrasadas = localArray.filter((cobranca) => {
      return (
        new Date(cobranca.expiration_date) < new Date() &&
        cobranca.billing_status === false
      );
    });

    let holderCobrancasAtrasadas = {};

    cobrancasAtrasadas.forEach(function (d) {
      if (holderCobrancasAtrasadas.hasOwnProperty(d.name)) {
        holderCobrancasAtrasadas[d.name] =
          holderCobrancasAtrasadas[d.name] + d.value;
      } else {
        holderCobrancasAtrasadas[d.name] = d.value;
      }
    });

    let bufferCobrancasAtrasadas = [];

    for (let prop in holderCobrancasAtrasadas) {
      bufferCobrancasAtrasadas.push({
        name: prop,
        value: holderCobrancasAtrasadas[prop],
      });
    }

    const arrayClientesInadimplentes = bufferCobrancasAtrasadas.map(
      (cliente) => {
        const clienteAtrasado = cobrancasAtrasadas.find((cobranca) => {
          return cobranca.name === cliente.name;
        });

        return { ...cliente, id: clienteAtrasado.clients_collection_id };
      }
    );

    setQtdClientesInadimplentes(arrayClientesInadimplentes.length);
    setClientesInadimplentes([
      ...arrayClientesInadimplentes
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .slice(0, 4),
    ]);

    const cobrancasEmDia = localArray.filter((cobranca) => {
      return (
        (new Date(cobranca.expiration_date) > new Date() &&
          cobranca.billing_status === false) ||
        cobranca.billing_status === true
      );
    });

    let holderCobrancasEmDia = {};

    cobrancasEmDia.forEach(function (d) {
      if (holderCobrancasEmDia.hasOwnProperty(d.name)) {
        holderCobrancasEmDia[d.name] = holderCobrancasEmDia[d.name] + d.value;
      } else {
        holderCobrancasEmDia[d.name] = d.value;
      }
    });

    let bufferCobrancasEmDia = [];

    for (let prop in holderCobrancasEmDia) {
      bufferCobrancasEmDia.push({
        name: prop,
        value: holderCobrancasEmDia[prop],
      });
    }

    const arrayClientesAdimplentes = bufferCobrancasEmDia.map((cliente) => {
      const clienteEmDia = cobrancasEmDia.find((cobranca) => {
        return cobranca.name === cliente.name;
      });

      return { ...cliente, id: clienteEmDia.clients_collection_id };
    });

    setQtdClientesAdimplentes(arrayClientesAdimplentes.length);
    setClientesAdimplentes([
      ...arrayClientesAdimplentes
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
        .slice(0, 4),
    ]);
  }

  function ClientesInadimplentes() {
    return clientesInadimplentes.map((cliente) => (
      <div className="container-individual-linha" key={cliente.id}>
        <span style={{ textAlign: "left", width: "16rem" }}>
          {cliente.name}
        </span>
        <span
          style={{ textAlign: "center", width: "10rem", marginRight: "8rem" }}
        >
          {cliente.id}
        </span>
        <span style={{ textAlign: "center", width: "10rem" }}>
          R$ {cliente.value}
        </span>
      </div>
    ));
  }

  function ClientesAdimplentes() {
    return clientesAdimplentes.map((cliente) => (
      <div className="container-individual-linha" key={cliente.id}>
        <span style={{ textAlign: "left", width: "16rem" }}>
          {cliente.name}
        </span>
        <span
          style={{ textAlign: "center", width: "10rem", marginRight: "8rem" }}
        >
          {cliente.id}
        </span>
        <span style={{ textAlign: "center", width: "10rem" }}>
          R$ {cliente.value}
        </span>
      </div>
    ));
  }

  function handleNavigateFilterClientesInadimplentes() {
    setBuscaClientes("inadimplentes");

    const newArray = [...localArrayClientes];

    const newArrayFilter = newArray.filter((cobrancas) => {
      return cobrancas.status_clients === false;
    });

    if (newArrayFilter.length <= 0) {
      setBuscaClientesErro(true);
    } else {
      setBuscaClientesErro(false);
    }

    setArrayClientesFilter(newArrayFilter);
    setArrayClientesFilterExibir(newArrayFilter.slice(0, 10));

    setItem("pagina", "clientes");
    navigate("/clientes");
  }

  function handleNavigateFilterClientesAdimplentes() {
    setBuscaClientes("adimplentes");

    const newArray = [...localArrayClientes];

    const newArrayFilter = newArray.filter((cobrancas) => {
      return cobrancas.status_clients === true;
    });

    if (newArrayFilter.length <= 0) {
      setBuscaClientesErro(true);
    } else {
      setBuscaClientesErro(false);
    }

    setArrayClientesFilter(newArrayFilter);
    setArrayClientesFilterExibir(newArrayFilter.slice(0, 10));

    setItem("pagina", "clientes");
    navigate("/clientes");
  }

  return (
    <div className="container-geral-display-clientes">
      <div className="container-individual-display-clientes">
        <div className="container-individual-titulo">
          <h3>
            <img src={imgClientesInadimplentes} alt="clientes-inadimplentes" />{" "}
            Cliente Inadimplentes
          </h3>
          <span className="cobranca-cor-vermelho">
            {qtdClientesInadimplentes}
          </span>
        </div>
        <div className="container-individual-cabecalho">
          <span>Clientes</span>
          <span>ID do Cliente</span>
          <span>Valor</span>
        </div>
        <div className="container-individual-informacoes">
          <ClientesInadimplentes />
        </div>
        <span
          onClick={() => handleNavigateFilterClientesInadimplentes()}
          className="container-individual-display-clientes-ver-todos"
        >
          Ver todos
        </span>
      </div>
      <div className="container-individual-display-clientes">
        <div className="container-individual-titulo">
          <h3>
            <img src={imgClientesAdimplentes} alt="clientes-adimplentes" />
            Clientes em Dia
          </h3>
          <span className="cobranca-cor-azul">{qtdClientesAdimplentes}</span>
        </div>
        <div className="container-individual-cabecalho">
          <span>Clientes</span>
          <span>ID do Cliente</span>
          <span>Valor</span>
        </div>
        <div className="container-individual-informacoes">
          <ClientesAdimplentes />
        </div>
        <span
          onClick={() => handleNavigateFilterClientesAdimplentes()}
          className="container-individual-display-clientes-ver-todos"
        >
          Ver todos
        </span>
      </div>
    </div>
  );
}

export default DisplayClientes;
