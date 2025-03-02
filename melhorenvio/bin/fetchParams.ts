// https://sandbox.melhorenvio.com.br/api/v2/me/cart EXEMPLO URL

interface fetchParamsProps {
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "OPTIONS"
    | "TRACE"
    | "CONNECT";
  path: string;
  environment: "sandbox" | "api";
  token: any;
  requestBody?: any;
  userAgent?: string;
}

export const fetchParams = async ({
  method,
  path,
  environment,
  token,
  requestBody,
  userAgent,
}: fetchParamsProps) => {
  const response = await fetch(
    `https://${environment}.melhorenvio.com.br${path}`,
    {
      method: method, // Método POST para enviar os dados
      headers: {
        Accept: "application/json", // Espera resposta em JSON
        "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
        Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
        "User-Agent": userAgent || "", // Identificação da aplicação
      },
      body: requestBody ? JSON.stringify(requestBody) : undefined, // Corpo da requisição em formato JSON
    }
  );

  return response;
};
