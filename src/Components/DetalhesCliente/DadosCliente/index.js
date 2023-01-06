import { useEffect } from "react";
import imagemLapis from "../../../Assets/detalhes-cliente/dados-cliente/lapis.svg";
import useGlobal from "../../../hooks/useGlobal";
import api from "../../../Services/api";
import { getItem } from "../../../Utils/storage";
import "./styles.css";

function DadosCliente({ clienteId }) {
  const { setLocalArrayClientes } = useGlobal();
  const { localCliente, setLocalCliente } = useGlobal();
  const { editarCliente, setEditarCliente } = useGlobal();
  const { formCadastroCobranca, setFormCadastroCobranca } = useGlobal();
  const token = getItem("token");

  useEffect(() => {
    atualizarTabelaClientesEBuscarInformacoesCliente();

    //eslint-disable-next-line
  }, []);

  async function atualizarTabelaClientesEBuscarInformacoesCliente() {
    const resposta = await api.get("/client", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLocalArrayClientes(resposta.data);

    const cliente = resposta.data.find((cliente) => {
      return parseInt(cliente.id) === parseInt(clienteId);
    });

    setLocalCliente({ ...cliente });

    setFormCadastroCobranca({
      ...formCadastroCobranca,
      name: cliente.name,
      clients_collection_id: cliente.id,
    });
  }

  return (
    <div className="clientes-detalhes-dados">
      <div className="clientes-dados-editar">
        <h3>Dados do Cliente</h3>
        <button onClick={() => setEditarCliente(!editarCliente)}>
          <img src={imagemLapis} alt="imagem-lapis" />
          Editar Cliente
        </button>
      </div>
      <div className="cliente-email-telefone-cep">
        <div>
          <h4>E-mail</h4>
          <span>{localCliente.email}</span>
        </div>
        <div>
          <h4>Telefone</h4>
          <span>{localCliente.phone}</span>
        </div>
        <div>
          <h4>CPF</h4>
          <span>{localCliente.cpf}</span>
        </div>
      </div>
      <div className="cliente-localizacao">
        <div>
          <h4>Endereço</h4>
          <span>{localCliente.adress}</span>
        </div>
        <div>
          <h4>Bairro</h4>
          <span>{localCliente.district}</span>
        </div>
        <div>
          <h4>Complemento</h4>
          <span>{localCliente.complement}</span>
        </div>
        <div>
          <h4>CEP</h4>
          <span>{localCliente.zip_code}</span>
        </div>
        <div>
          <h4>Cidade</h4>
          <span>{localCliente.city}</span>
        </div>
        <div>
          <h4>UF</h4>
          <span>{localCliente.state}</span>
        </div>
      </div>
    </div>
  );
}

export default DadosCliente;
