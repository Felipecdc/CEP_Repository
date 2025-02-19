import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

export const getFaturasMelhorEnvio = async () => {
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
      "https://sandbox.melhorenvio.com.br/api/v2/me/invoices",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao buscar pendencias: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("Faturas:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar faturas:", error);
    return error;
  }
};

getFaturasMelhorEnvio();

// TESTANDO ESTE CODIGO, AINDA EM DESENVOLVIMENTO
