import "dotenv/config"; // Importa as variáveis de ambiente do arquivo .env
import { fetchParams } from "../../bin/fetchParams";

// Função assíncrona para rastrear envio pelo Melhor Envio
export const trackShipmentStatusById = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API
  const requestBody = {
    orders: [orderId], // Corpo da requisição: array com IDs de pedidos
  };

  try {
    // Faz a requisição à API do Melhor Envio (ambiente sandbox)

    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/tracking",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê os detalhes do erro
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`); // Lança uma exceção com o erro
    }

    const data = await response.json(); // Converte a resposta em JSON
    return data; // Retorna os dados do rastreamento
  } catch (error) {
    return error; // Retorna o erro capturado
  }
};
