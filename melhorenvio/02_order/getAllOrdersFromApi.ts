import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../bin/fetchParams";

export const getAllOrdersFromApi = async () => {
  // Obtém o token de autenticação da variável de ambiente
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  try {
    const response = await fetchParams({
      method: "GET",
      environment: "sandbox",
      path: "/api/v2/me/orders",
      token: token,
      userAgent: "minhaaplicacao@example.com",
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém detalhes do erro
      throw new Error(`Erro ao buscar orders: ${errorDetails}`); // Lança um erro com os detalhes
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
