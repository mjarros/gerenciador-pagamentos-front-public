import "./styles.css";
import imagemCobrancas from "../../../Assets/cobrancas/imagem-cobrancas.svg";
import imagemFiltro from "../../../Assets/clientes/internal-header/imagem-filtro.svg";
import imagemLupa from "../../../Assets/clientes/internal-header/lupa.svg";
import useGlobal from "../../../hooks/useGlobal";

function InternalHeaderCobrancas() {
  const { buscaCobranca, setBuscaCobranca } = useGlobal();
  const { setArrayCobrancasFilter } = useGlobal();
  const { setArrayCobrancasFilterExibir } = useGlobal();
  const { localArrayCobrancas } = useGlobal();
  const { setBuscaCobrancaErro } = useGlobal();

  function handleChangeInput(e) {
    setBuscaCobranca(e.target.value);

    const newArray = [...localArrayCobrancas];

    const newArrayFilterName = newArray.filter((cobrancas) => {
      return (
        cobrancas.name.includes(buscaCobranca) ||
        cobrancas.id.toString().includes(buscaCobranca)
      );
    });

    if (newArrayFilterName.length <= 0) {
      setBuscaCobrancaErro(true);
    } else {
      setBuscaCobrancaErro(false);
    }

    setArrayCobrancasFilter(newArrayFilterName);
    setArrayCobrancasFilterExibir(newArrayFilterName.slice(0, 10));

    if (buscaCobranca === "vencidas") {
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
    }

    if (buscaCobranca === "previstas") {
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
    }

    if (buscaCobranca === "pagas") {
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
    }
  }

  return (
    <div className="cobrancas-cabecalho-interno">
      <div className="div-esquerda">
        <img src={imagemCobrancas} alt="imagem-clientes" />
        <span>Cobranças</span>
      </div>

      <div className="div-direita position-relative">
        <img src={imagemFiltro} alt="imagem-filtro" />
        <input
          onChange={handleChangeInput}
          name="valorBuscado"
          value={buscaCobranca}
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

export default InternalHeaderCobrancas;
