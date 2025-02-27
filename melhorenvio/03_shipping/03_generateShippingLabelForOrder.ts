import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função assíncrona para gerar a etiqueta de envio pelo Melhor Envio
export const generateShippingLabelForOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token da variável de ambiente

  // Configuração da requisição para a API
  const options = {
    method: "POST", // Método POST para envio de dados
    headers: {
      Accept: "application/json", // Espera resposta em JSON
      "Content-Type": "application/json", // Define o formato do corpo da requisição como JSON
      Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
      "User-Agent": "MinhaAplicacao (meuemail@exemplo.com)", // Identificação da aplicação
    },
    body: JSON.stringify({
      orders: [orderId], // Envia um array com o ID do pedido
    }),
  };

  try {
    // Faz a requisição para gerar a etiqueta (ambiente sandbox)
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/generate",
      options
    );

    // Verifica se a resposta foi bem-sucedida (status 200-299)
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém os detalhes do erro
      throw new Error(`Erro ao gerar etiqueta: ${errorDetails}`); // Lança um erro com os detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    return data; // Retorna os dados da etiqueta
  } catch (error) {
    return error; // Retorna o erro capturado
  }
};
