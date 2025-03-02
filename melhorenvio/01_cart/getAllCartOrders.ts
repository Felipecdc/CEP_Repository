import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../bin/fetchParams";

// Função assíncrona para buscar todos os pedidos no Melhor Envio
export const getAllCartOrders = async () => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  try {
    // Envia a requisição para buscar todos os pedidos
    const response = await fetchParams({
      method: "GET",
      environment: "sandbox",
      path: "/api/v2/me/cart",
      token: token,
      userAgent: "minhaaplicacao@example.com",
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro em texto
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados dos pedidos
  } catch (error) {
    // Caso ocorra um erro, retorna uma mensagem de erro

    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
