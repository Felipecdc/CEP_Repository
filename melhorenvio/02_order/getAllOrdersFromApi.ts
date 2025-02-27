import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

export const getAllOrdersFromApi = async () => {
  // Obtém o token de autenticação da variável de ambiente
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
      "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém detalhes do erro
      throw new Error(`Erro ao buscar orders: ${errorDetails}`); // Lança um erro com os detalhes
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
