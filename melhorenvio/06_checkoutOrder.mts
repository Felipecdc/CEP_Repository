export const checkoutOrder = async (orderId: string) => {
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
      orders: [orderId],
    }),
  };

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/checkout",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
