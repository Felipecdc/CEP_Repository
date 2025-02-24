import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para calcular o frete com base no CEP de origem e destino
export const calculateShippingCost = async (
  origem: string,
  destino: string
) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Corpo da requisição, com os dados de origem, destino e produto
  const requestBody = {
    from: { postal_code: origem }, // CEP de origem
    to: { postal_code: destino }, // CEP de destino
    products: [{ height: 1, width: 2, length: 2, weight: 0.3 }], // Informações do produto (dimensões e peso)
  };

  try {
    // Envia a requisição para calcular o frete
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      {
        method: "POST", // Método POST para enviar os dados
        headers: {
          Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          Accept: "application/json", // Espera resposta em JSON
          "User-Agent": "Aplication test - Email para contato", // Identificação da aplicação
        },
        body: JSON.stringify(requestBody), // Corpo da requisição em formato JSON
      }
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao calcular o frete: ${errorDetails}`); // Lança erro com detalhes
    }

    // Converte a resposta para JSON e retorna os dados
    const data = await response.json().catch((err) => {
      throw new Error("Erro ao processar a resposta JSON: " + err.message); // Trata erro no processamento da resposta JSON
    });
    return data; // Retorna os dados da resposta
  } catch (error) {
    return error; // Retorna o erro caso algo falhe
  }
};

// calculateShippingCost("", "");
