import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função para obter informações da conta do Melhor Envio
export const getAccountInformation = async () => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  const options = {
    method: "GET", // Define o método HTTP como GET para buscar informações
    headers: {
      Accept: "application/json", // Define que a resposta esperada é em formato JSON
      Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho de autorização
      "User-Agent": "Aplicação (email para contato técnico)", // Define o user-agent para identificar a aplicação
    },
  };

  try {
    // Faz a requisição para a API do Melhor Envio para obter informações da conta
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me", // URL da API para obter os dados da conta
      options
    );

    // Se a resposta da API não for bem-sucedida (erro HTTP)
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém detalhes do erro
      throw new Error(`Erro ao buscar dados: ${errorDetails}`); // Lança um erro com os detalhes
    }

    // Converte a resposta em formato JSON
    const data = await response.json();
    return data; // Retorna as informações da conta
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console
    return error; // Retorna o erro
  }
};

// Chama a função para obter as informações da conta
getAccountInformation();
