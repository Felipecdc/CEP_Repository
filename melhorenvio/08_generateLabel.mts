import "dotenv/config";

export const generateLabel = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "MinhaAplicacao (meuemail@exemplo.com)",
    },
    body: JSON.stringify({
      orders: [orderId], // Aqui deve ser um array com os IDs dos pedidos
    }),
  };
  console.log("Corpo da requisição:", JSON.stringify(options.body, null, 2));

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/generate",
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

(async () => {
  const orderId = "9e3478a5-84e5-4be8-94cc-82a936a8f28f";
  const response = await generateLabel(orderId);
  console.log(response);
})();

// TESTANDO
