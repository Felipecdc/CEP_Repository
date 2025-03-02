import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../bin/fetchParams";

// Função assíncrona para fazer o checkout do pedido no Melhor Envio
export const checkoutOrderCreate = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API
  const requestBody = {
    orders: [orderId], // Corpo da requisição: array contendo o ID do pedido
  };

  try {
    // Envia a requisição para o checkout do pedido (ambientação sandbox)
    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/checkout",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê os detalhes do erro
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`); // Lança erro com os detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do checkout
  } catch (error) {
    return error; // Retorna o erro caso ocorra
  }
};
