export const calculateShipping = async (origem: string, destino: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const requestBody = {
    from: { postal_code: origem },
    to: { postal_code: destino },
    products: [{ height: 1, width: 2, length: 2, weight: 0.3 }],
  };

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "Aplication test - Email para contato",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao calcular o frete: ${errorDetails}`);
    }

    const data = await response.json().catch((err) => {
      throw new Error("Erro ao processar a resposta JSON: " + err.message);
    });
    return data;
  } catch (error) {
    return error;
  }
};
