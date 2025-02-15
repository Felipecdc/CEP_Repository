export const confirmOrder = async (orderId: string) => {
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
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/generate",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`);
    }
  } catch (error) {
    return error;
  }
};

const response = await confirmOrder("9e3478a5-84e5-4be8-94cc-82a936a8f28f");
console.log(response);

// TESTANDO
