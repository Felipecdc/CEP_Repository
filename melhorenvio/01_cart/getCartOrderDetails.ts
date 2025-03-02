import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../bin/fetchParams";

// Função assíncrona para buscar os detalhes de um pedido no Melhor Envio
export const getCartOrderDetails = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  try {
    // Envia a requisição para buscar informações do pedido

    const response = await fetchParams({
      method: "GET",
      environment: "sandbox",
      path: `/api/v2/me/cart/${orderId}`,
      token: token,
      userAgent: "minhaaplicacao@example.com",
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro em texto
      throw new Error(`Erro ao buscar detalhes da order: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do pedido
  } catch (error) {
    return error; // Retorna o erro caso algo dê errado
  }
};
