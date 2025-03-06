import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import { fetchParams } from "../../bin/fetchParams";

// Função para obter informações da conta do Melhor Envio
export const getAccountInformation = async () => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  try {
    // Faz a requisição para a API do Melhor Envio para obter informações da conta

    const response = await fetchParams({
      method: "GET",
      environment: "sandbox",
      path: "/api/v2/me",
      token: token,
      userAgent: "minhaaplicacao@example.com",
    });

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
