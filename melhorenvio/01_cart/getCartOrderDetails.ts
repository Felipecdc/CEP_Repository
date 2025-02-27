import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para buscar os detalhes de um pedido no Melhor Envio
export const getCartOrderDetails = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API (GET para obter informações do pedido)
  const options = {
    method: "GET", // Método GET para buscar informações
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
  };

  try {
    // Envia a requisição para buscar informações do pedido
    const response = await fetch(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      options
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro em texto
      throw new Error(`Erro ao buscar detalhes da order: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados do pedido
  } catch (error) {
    return error; // Retorna o erro caso algo dê errado
  }
};
