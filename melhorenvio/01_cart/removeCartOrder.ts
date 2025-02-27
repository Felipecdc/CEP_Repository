import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para remover um pedido do carrinho no Melhor Envio
export const removeCartOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API (DELETE para remover o pedido)
  const options = {
    method: "DELETE", // Método DELETE para remover um pedido
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
  };

  try {
    // Envia a requisição para remover o pedido do carrinho
    const response = await fetch(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      options
    );

    const text = await response.text(); // Lê a resposta como texto

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${text}`); // Lança erro com status e detalhes
    }

    try {
      const data = JSON.parse(text); // Tenta converter a resposta em JSON
      return {
        success: true, // Retorna sucesso se o pedido foi removido corretamente
        status: response.status, // Retorna o status da resposta
        data, // Retorna os dados da resposta
      };
    } catch {
      return {
        status: response.status,
        success: true,
        message: "Item excluído do carrinho com sucesso!", // Caso não seja JSON, apenas retorna a mensagem
      };
    }
  } catch (error) {
    // Se ocorrer algum erro durante a requisição, retorna um erro com status 500
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Erro desconhecido", // Detalhes do erro
    };
  }
};
