import "./styles.css";
import imagemPagas from "../../../Assets/somas-resumo/imagem-pagas.svg";
import imagemVencidas from "../../../Assets/somas-resumo/imagem-vencidas.svg";
import imagemPrevistas from "../../../Assets/somas-resumo/imagem-previstas.svg";
import { useEffect, useState } from "react";
import { getItem } from "../../../Utils/storage";
import api from "../../../Services/api";

function SomasContainers() {
  useEffect(() => {
    handleAtualizarCobrancasPagas();
    //eslint-disable-next-line
  }, []);

  const [somaCobrancasPagas, setSomaCobrancasPagas] = useState(null);
  const [somaCobrancasPrevistas, setSomaCobrancasPrevistas] = useState(null);
  const [somaCobrancasVencidas, setSomaCobrancasVencidas] = useState(null);

  const token = getItem("token");

  async function handleAtualizarCobrancasPagas() {
    try {
      const somaPagas = await api.get("/collection/paid", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSomaCobrancasPagas(somaPagas.data);

      const somaPrevistas = await api.get("/collection/future", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSomaCobrancasPrevistas(somaPrevistas.data);

      const somaVencidas = await api.get("/collection/overdue", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSomaCobrancasVencidas(somaVencidas.data);
    } catch (error) {}
  }

  return (
    <div className="somas-container">
      <div className="background-rosa">
        <img src={imagemVencidas} alt="imagem-cobrancas-vencidas" />
        <div>
          <span>Cobranças Vencidas</span>
          <span>R$ {parseInt(somaCobrancasVencidas).toFixed(2)}</span>
        </div>
      </div>
      <div className="background-laranja">
        <img src={imagemPrevistas} alt="imagem-cobrancas-previstas" />
        <div>
          <span>Cobraças Previstas</span>
          <span>R$ {parseInt(somaCobrancasPrevistas).toFixed(2)}</span>
        </div>
      </div>
      <div className="background-azul">
        <img src={imagemPagas} alt="imagem-cobrancas-pagas" />
        <div>
          <span>Cobranças Pagas</span>
          <span>R$ {parseInt(somaCobrancasPagas).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default SomasContainers;
