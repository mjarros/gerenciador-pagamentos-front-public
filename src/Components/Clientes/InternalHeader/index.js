import "./styles.css";
import imagemCLientes from "../../../Assets/clientes/internal-header/imagem-clientes.svg";
import imagemFiltro from "../../../Assets/clientes/internal-header/imagem-filtro.svg";
import imagemLupa from "../../../Assets/clientes/internal-header/lupa.svg";
import useGlobal from "../../../hooks/useGlobal";

function InternalHeader() {
  const { setAdicionarCliente } = useGlobal();
  const { buscaClientes, setBuscaClientes } = useGlobal();
  const { setBuscaClientesErro } = useGlobal();
  const { setArrayClientesFilter } = useGlobal();
  const { localArrayClientes } = useGlobal();
  const { setArrayClientesFilterExibir } = useGlobal();

  function handleAdicionarCliente() {
    setAdicionarCliente(true);
  }

  function handleChangeInput(e) {
    setBuscaClientes(e.target.value);

    const newArray = [...localArrayClientes];

    const newArrayFilter = newArray.filter((clientes) => {
      return (
        clientes.name.includes(buscaClientes) ||
        clientes.cpf.toString().includes(buscaClientes) ||
        clientes.email.includes(buscaClientes)
      );
    });

    if (newArrayFilter.length <= 0) {
      setBuscaClientesErro(true);
    } else {
      setBuscaClientesErro(false);
    }

    setArrayClientesFilter(newArrayFilter);
    setArrayClientesFilterExibir(newArrayFilter.slice(0, 10));

    if (buscaClientes === "adimplentes") {
      const newArray = [...localArrayClientes];

      const newArrayFilter = newArray.filter((clientes) => {
        return clientes.status_clients === true;
      });

      if (newArrayFilter.length <= 0) {
        setBuscaClientesErro(true);
      } else {
        setBuscaClientesErro(false);
      }

      setArrayClientesFilter(newArrayFilter);
      setArrayClientesFilterExibir(newArrayFilter.slice(0, 10));
    }

    if (buscaClientes === "inadimplentes") {
      const newArray = [...localArrayClientes];

      const newArrayFilter = newArray.filter((clientes) => {
        return clientes.status_clients === false;
      });

      if (newArrayFilter.length <= 0) {
        setBuscaClientesErro(true);
      } else {
        setBuscaClientesErro(false);
      }

      setArrayClientesFilter(newArrayFilter);
      setArrayClientesFilterExibir(newArrayFilter.slice(0, 10));
    }
  }

  return (
    <div className="clientes-cabecalho-interno">
      <div className="div-esquerda">
        <img src={imagemCLientes} alt="imagem-clientes" />
        <span>Clientes</span>
      </div>

      <div className="div-direita position-relative">
        <button onClick={() => handleAdicionarCliente()}>
          + Adicionar Cliente
        </button>
        <img src={imagemFiltro} alt="imagem-filtro" />
        <input
          onChange={handleChangeInput}
          name="valorBuscado"
          value={buscaClientes}
          placeholder="Pesquisa"
        ></input>
        <img
          className="imagem-lupa-pesquisa"
          src={imagemLupa}
          alt="imagem-lupa"
        />
      </div>
    </div>
  );
}

export default InternalHeader;
