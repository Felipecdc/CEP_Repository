import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../../bin/fetchParams";

// Função assíncrona para gerar a etiqueta de envio pelo Melhor Envio
export const generateShippingLabelForOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token da variável de ambiente

  // Configuração da requisição para a API
  const requestBody = {
    orders: [orderId], // Envia um array com o ID do pedido
  };

  try {
    // Faz a requisição para gerar a etiqueta (ambiente sandbox)

    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/generate",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém os detalhes do erro
      throw new Error(`Erro ao gerar etiqueta: ${errorDetails}`); // Lança um erro com os detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados da etiqueta
  } catch (error) {
    return error; // Retorna o erro capturado
  }
};
