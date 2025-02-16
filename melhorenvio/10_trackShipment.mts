import "dotenv/config"; // Importa as variáveis de ambiente do arquivo .env

// Função assíncrona para rastrear envio pelo Melhor Envio
export const trackShipment = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição para a API
  const options = {
    method: "POST", // Método POST para envio de dados
    headers: {
      Accept: "application/json", // Aceita resposta em JSON
      "Content-type": "application/json", // Envia o corpo da requisição em JSON
      Authorization: `Bearer ${token}`, // Insere o token para autenticação
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
    body: JSON.stringify({
      orders: [orderId], // Corpo da requisição: array com IDs de pedidos
    }),
  };

  try {
    // Faz a requisição à API do Melhor Envio (ambiente sandbox)
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/tracking",
      options
    );

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê os detalhes do erro
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`); // Lança uma exceção com o erro
    }

    const data = await response.json(); // Converte a resposta em JSON
    return data; // Retorna os dados do rastreamento
  } catch (error) {
    return error; // Retorna o erro capturado
  }
};

// Chama a função passando um ID de pedido e exibe o resultado no console
const response = await trackShipment("9e37da93-6a82-45dd-a815-3d5590500a5e");
console.log(response); // Exibe o resultado da API ou o erro
