import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para fazer o checkout do pedido no Melhor Envio
export const checkoutOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API
  const options = {
    method: "POST", // Método POST para enviar dados
    headers: {
      Accept: "application/json", // Espera uma resposta em JSON
      "Content-Type": "application/json", // Define o tipo de conteúdo da requisição como JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
    body: JSON.stringify({
      orders: [orderId], // Corpo da requisição: array contendo o ID do pedido
    }),
  };

  try {
    // Envia a requisição para o checkout do pedido (ambientação sandbox)
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/checkout",
      options
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê os detalhes do erro
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`); // Lança erro com os detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do checkout
  } catch (error) {
    return error; // Retorna o erro caso ocorra
  }
};
