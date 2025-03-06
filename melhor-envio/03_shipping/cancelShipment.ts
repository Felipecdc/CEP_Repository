import "dotenv/config";
import { fetchParams } from "../../bin/fetchParams";

export const cancelShipment = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const requestBody = {
    orders: {
      id: orderId,
      reason_id: 2, // Exemplo: Pedido do cliente
      description: "O cliente solicitou o cancelamento.",
    },
  };

  try {
    const response = await fetchParams({
      method: "POST",
      environment: "sandbox",
      path: "/api/v2/me/shipment/cancel",
      token: token,
      userAgent: "minhaaplicacao@example.com",
      requestBody: requestBody,
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao cancelar envio: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
