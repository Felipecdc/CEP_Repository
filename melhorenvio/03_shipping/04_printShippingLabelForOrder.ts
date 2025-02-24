import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para gerar a etiqueta de envio via Melhor Envio
export const printShippingLabelForOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Configuração da requisição
  const options = {
    method: "POST", // Método POST para envio de dados
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      "Content-Type": "application/json", // Envia os dados em JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Identificação da aplicação
    },
    body: JSON.stringify({
      orders: [orderId], // Corpo da requisição: array com IDs de pedidos
    }),
  };

  try {
    // Envia a requisição para gerar a etiqueta (ambiente sandbox)
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/print",
      options
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao gerar link: ${errorDetails}`); // Lança uma exceção com o erro
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data;
  } catch (error) {
    return error;
  }
};

// Executa a função passando o ID do pedido e exibe o resultado
printShippingLabelForOrder("");
