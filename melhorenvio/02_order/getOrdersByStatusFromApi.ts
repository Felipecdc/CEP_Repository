import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../bin/fetchParams";

export const getOrdersByStatusFromApi = async (status: string) => {
  // Obtém o token de autenticação da variável de ambiente
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  try {
    // Modifica a URL para incluir o filtro de status
    const response = await fetchParams({
      method: "GET",
      environment: "sandbox",
      path: `/api/v2/me/orders?status=${status}`,
      token: token,
      userAgent: "minhaaplicacao@example.com",
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém detalhes do erro
      throw new Error(`Erro ao buscar order: ${errorDetails}`); // Lança um erro com os detalhes
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

// Exemplo de uso da função, buscando apenas os pedidos com status 'posted'
// getOrdersByStatusFromApi("posted");
