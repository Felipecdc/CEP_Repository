import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para confirmar o pedido no Melhor Envio
export const confirmOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API
  const options = {
    method: "POST", // Método POST para enviar dados
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
    body: JSON.stringify({
      orders: [orderId], // Corpo da requisição: array com o ID do pedido
    }),
  };

  try {
    // Envia a requisição para confirmar o pedido (ambientação sandbox)
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/generate",
      options
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê os detalhes do erro
      throw new Error(`Erro ao fazer checkout: ${errorDetails}`); // Lança erro com os detalhes
    }
  } catch (error) {
    return error; // Retorna o erro capturado
  }
};

// Chama a função passando o ID do pedido e exibe a resposta ou erro no console
const response = await confirmOrder("9e3478a5-84e5-4be8-94cc-82a936a8f28f");
console.log(response); // Exibe a resposta ou erro no console
