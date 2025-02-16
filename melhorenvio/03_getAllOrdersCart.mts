import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para buscar todos os pedidos no Melhor Envio
export const getAllOrders = async () => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API (GET para obter todos os pedidos)
  const options = {
    method: "GET", // Método GET para buscar informações
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
  };

  try {
    // Envia a requisição para buscar todos os pedidos
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      options
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro em texto
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados dos pedidos
  } catch (error) {
    // Caso ocorra um erro, retorna uma mensagem de erro
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
