import { useEffect, useState } from "react";
import imagemCLientes from "../../../Assets/clientes/internal-header/imagem-clientes.svg";
import useGlobal from "../../../hooks/useGlobal";
import "./styles.css";

function HeaderDeatlhesCliente({ clienteId }) {
  const { localArrayClientes } = useGlobal();

  const [localCliente, setLocalCliente] = useState({});

  useEffect(() => {
    handleBuscarInformacoesCliente();
    //eslint-disable-next-line
  }, []);

  function handleBuscarInformacoesCliente() {
    const cliente = localArrayClientes.find((cliente) => {
      return parseInt(cliente.id) === parseInt(clienteId);
    });

    setLocalCliente({ ...cliente });
  }

  return (
    <div className="clientes-detalhes-cabecalho-interno">
      <div>
        <img src={imagemCLientes} alt="imagem-clientes" />
        <span>{localCliente.name}</span>
      </div>
    </div>
  );
}

export default HeaderDeatlhesCliente;
