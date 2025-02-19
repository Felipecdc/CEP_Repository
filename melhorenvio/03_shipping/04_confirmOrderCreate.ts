import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para confirmar o pedido no Melhor Envio
export const confirmOrderCreate = async (orderId: string) => {
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
      throw new Error(`Erro ao confirmar pedido: ${errorDetails}`); // Lança erro com os detalhes
    }

    const data = await response.json();
    console.log("Pedido confirmado: ", data);
    return data;
  } catch (error) {
    console.log(error);
    return error; // Retorna o erro capturado
  }
};

confirmOrderCreate("9e3c744b-7551-47ff-813b-c2da5c919174");

// Chama a função passando o ID do pedido e exibe a resposta ou erro no console
// const response = await confirmOrder("9e37da93-6a82-45dd-a815-3d5590500a5e");
// console.log(response); // Exibe a resposta ou erro no console
