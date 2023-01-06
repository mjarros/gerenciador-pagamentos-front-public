import { useEffect } from "react";
import arrows from "../../../Assets/clientes/tabelaClientes/arrows.svg";
import editarCobranca from "../../../Assets/detalhes-cliente/cobrancas-cliente/editar-cobranca.svg";
import excluirCobranca from "../../../Assets/detalhes-cliente/cobrancas-cliente/excluir-cobranca.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function CobrancasCliente({ clienteId }) {
  const { localCobrancasCliente, setLocalCobrancasCliente } = useGlobal();
  const { setModalCadastroCobranca } = useGlobal();
  const { setModalEditarCobranca } = useGlobal();
  const { setModalExcluirCobranca } = useGlobal();
  const { localArrayCobrancas, setLocalArrayCobrancas } = useGlobal();
  const { setFormEditarCobranca } = useGlobal();

  const token = getItem("token");

  useEffect(() => {
    atualizarTabelaCobrancasEBuscarCobrancasCliente();
    //eslint-disable-next-line
  }, []);

  async function atualizarTabelaCobrancasEBuscarCobrancasCliente() {
    const resposta = await api.get("/collection/list", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalArrayCobrancas(resposta.data);

    const cobrancasCliente = resposta.data.filter((cobrancas) => {
      return parseInt(cobrancas.clients_collection_id) === parseInt(clienteId);
    });

    const cobrancasClienteSlice = cobrancasCliente.slice(0, 3);

    setLocalCobrancasCliente([...cobrancasClienteSlice]);
  }

  function handleAbrirModalEditarCobranca(id) {
    const cobranca = localArrayCobrancas.find((cobranca) => {
      return parseInt(cobranca.id) === parseInt(id);
    });

    setFormEditarCobranca({
      ...cobranca,
      expiration_date: new Date(cobranca.expiration_date).toLocaleString("sv"),
    });

    setModalEditarCobranca(true);
  }

  function handleAbrirModalExcluirCobranca(id) {
    setFormEditarCobranca({
      ...setFormEditarCobranca,
      id,
    });

    setModalExcluirCobranca(true);
  }

  function CobrancasMap() {
    return localCobrancasCliente.map((cobranca) => (
      <div key={cobranca.id} className="div-tabela-cobranca">
        <span className="cobranca-dado width-5rem">{cobranca.id}</span>
        <span className="cobranca-dado width-10rem">
          {new Date(cobranca.expiration_date).toLocaleDateString()}
        </span>
        <span
          style={{ justifyContent: "left" }}
          className="cobranca-dado width-10rem"
        >
          R$ {parseInt(cobranca.value).toFixed(2)}
        </span>

        {cobranca.billing_status === true && (
          <span className="status adimplente width-9rem">Paga</span>
        )}
        {cobranca.billing_status === false &&
        new Date(cobranca.expiration_date) >= new Date() ? (
          <span className="status pendente width-9rem">Pendente</span>
        ) : (
          cobranca.billing_status === false && (
            <span className="status inadimplente width-9rem">Vencida</span>
          )
        )}

        <span
          style={{
            marginLeft: "0.75rem",
            justifyContent: "flex-start",
            width: "26rem",
          }}
          className="cobranca-dado"
        >
          {cobranca.description}
        </span>

        <div className="cobranca-icones-editar">
          <img
            onClick={() => handleAbrirModalEditarCobranca(cobranca.id)}
            src={editarCobranca}
            alt="imagem-cobranca-editar"
          ></img>
          <img
            onClick={() => handleAbrirModalExcluirCobranca(cobranca.id)}
            src={excluirCobranca}
            alt="imagem-cobranca-excluir"
          ></img>
        </div>
      </div>
    ));
  }

  return (
    <div className="clientes-cobrancas">
      <div className="cobrancas-adicionar">
        <h3>Cobrancas do Cliente</h3>
        <button onClick={() => setModalCadastroCobranca(true)}>
          + Nova Cobranca
        </button>
      </div>

      <div className="clintes-cobrancas-cabecalho">
        <span>
          <img src={arrows} alt="arrows" /> ID Cob.
        </span>
        <span className="margin-left-4rem">
          <img src={arrows} alt="arrows" /> Data Venc.
        </span>
        <span className="margin-left-7rem">Valor</span>
        <span className="margin-left-13rem">Status</span>
        <span className="margin-left-10rem">Descrição</span>
      </div>
      {localCobrancasCliente && <CobrancasMap />}
    </div>
  );
}

export default CobrancasCliente;
