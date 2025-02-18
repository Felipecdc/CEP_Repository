import "dotenv/config";

export const cancelShipment = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Aplicação (email para contato técnico)",
    },
    body: JSON.stringify({
      orders: {
        id: orderId,
        reason_id: 2, // Exemplo: Pedido do cliente
        description: "O cliente solicitou o cancelamento.",
      },
    }),
  };

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/cancel",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao cancelar envio: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

cancelShipment("9e3c744b-7551-47ff-813b-c2da5c919174");
