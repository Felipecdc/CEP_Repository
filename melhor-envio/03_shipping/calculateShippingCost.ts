import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../../bin/fetchParams";

interface calculateShippingCostProps {
  cepOrigim: string;
  cepDestino: string;
}

// Função assíncrona para calcular o frete com base no CEP de origem e destino
export const calculateShippingCost = async ({
  cepOrigim,
  cepDestino,
}: calculateShippingCostProps) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Corpo da requisição, com os dados de origem, destino e produto
  const requestBody = {
    from: { postal_code: cepOrigim }, // CEP de origem
    to: { postal_code: cepDestino }, // CEP de destino
    products: [{ height: 1, width: 2, length: 2, weight: 0.3 }], // Informações do produto (dimensões e peso)
  };

  try {
    // Envia a requisição para calcular o frete
    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/calculate",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao calcular o frete: ${errorDetails}`); // Lança erro com detalhes
    }

    // Converte a resposta para JSON e retorna os dados
    const data = await response.json().catch((err) => {
      throw new Error("Erro ao processar a resposta JSON: " + err.message); // Trata erro no processamento da resposta JSON
    });
    return data; // Retorna os dados da resposta
  } catch (error) {
    return error; // Retorna o erro caso algo falhe
  }
};
