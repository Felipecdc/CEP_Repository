export const getOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Aplicação (email para contato técnico)",
    },
  };

  try {
    const response = await fetch(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
