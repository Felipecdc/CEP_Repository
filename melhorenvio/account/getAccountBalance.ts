import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Função para obter o saldo da conta do Melhor Envio
export const getAccountBalance = async () => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  const options = {
    method: "GET", // Define o método HTTP como GET para buscar dados
    headers: {
      Accept: "application/json", // Define o tipo de resposta esperada como JSON
      Authorization: `Bearer ${token}`, // Passa o token de autenticação no cabeçalho
      "User-Agent": "Aplicação (email para contato técnico)", // Define o user-agent para identificar a aplicação
    },
  };

  try {
    // Faz a requisição para a API do Melhor Envio para obter os dados da conta
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me", // URL da API para consultar os dados da conta
      options
    );

    // Se a resposta da API não for bem-sucedida (erro HTTP)
    if (!response.ok) {
      const errorDetails = await response.text(); // Obtém detalhes do erro
      throw new Error(`Erro ao buscar saldo: ${errorDetails}`); // Lança um erro com as informações
    }

    // Converte a resposta em formato JSON
    const data = await response.json();

    // Extrai o saldo da conta, retornando 0 se não estiver disponível
    const balance = data.accounts?.[0]?.balance ?? 0;
    return balance; // Retorna o saldo
  } catch (error) {
    // Em caso de erro, exibe a mensagem de erro no console
    return error; // Retorna o erro
  }
};

// Chama a função para obter o saldo
getAccountBalance();
