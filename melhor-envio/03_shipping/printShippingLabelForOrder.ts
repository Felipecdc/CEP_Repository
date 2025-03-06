import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../../bin/fetchParams";

// Função assíncrona para gerar a etiqueta de envio via Melhor Envio
export const printShippingLabelForOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição
  const requestBody = {
    orders: [orderId], // Corpo da requisição: array com IDs de pedidos
  };

  try {
    // Envia a requisição para gerar a etiqueta (ambiente sandbox)

    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/print",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao gerar link: ${errorDetails}`); // Lança uma exceção com o erro
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data;
  } catch (error) {
    return error;
  }
};
