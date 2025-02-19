import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env

// Definição de interface para representar o endereço
interface Address {
  name: string; // Nome do destinatário ou remetente
  address: string; // Endereço
  city: string; // Cidade
  postal_code: string; // Código postal
  document: string; // Documento (CPF ou CNPJ)
  phone: string; // Telefone
}

// Definição de interface para representar os volumes (dimensões e peso)
interface Volume {
  height: number; // Altura do volume
  width: number; // Largura do volume
  length: number; // Comprimento do volume
  weight: number; // Peso do volume
}

// Definição de interface para os parâmetros ao criar o pedido
interface SendOrderParams {
  service: number; // ID do serviço escolhido para o envio
  insurance_value: number; // Valor do seguro
  receipt: boolean; // Se a entrega necessita de confirmação de recebimento
  own_hand: boolean; // Se a entrega precisa ser feita diretamente para o destinatário
  reverse: boolean; // Se o frete será reverso (quem paga o frete é o destinatário)
  non_commercial: boolean; // Se o pedido é para envio não comercial
  from: Address; // Endereço de origem (remetente)
  to: Address; // Endereço de destino (destinatário)
  volumes: Volume[]; // Lista de volumes que estão sendo enviados
}

// Função assíncrona para criar um pedido no Melhor Envio
export async function createCartShippingOrder(data: SendOrderParams) {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN; // Obtém o token de autenticação da variável de ambiente

  // Corpo da requisição com os dados do pedido
  const requestBody = {
    service: data.service, // Serviço escolhido
    options: {
      insurance_value: data.insurance_value, // Valor do seguro
      receipt: data.receipt, // Confirmação de recebimento
      own_hand: data.own_hand, // Entrega em mãos
      reverse: data.reverse, // Frete reverso
      non_commercial: data.non_commercial, // Envio não comercial
    },
    from: data.from, // Endereço de origem
    to: data.to, // Endereço de destino
    volumes: data.volumes, // Volumes do pedido
  };

  try {
    // Envia a requisição para criar o pedido no Melhor Envio
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      {
        method: "POST", // Método POST para enviar os dados
        headers: {
          Accept: "application/json", // Espera resposta em JSON
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          Authorization: `Bearer ${token}`, // Insere o token de autenticação no cabeçalho
          "User-Agent": "minhaaplicacao@example.com", // Identificação da aplicação
        },
        body: JSON.stringify(requestBody), // Corpo da requisição em formato JSON
      }
    );

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      const errorDetails = await response.text(); // Lê detalhes do erro
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`); // Lança erro com detalhes
    }

    const data = await response.json(); // Converte a resposta para JSON
    console.log(data);
    return data; // Retorna os dados do pedido
  } catch (error) {
    console.error("Erro do catch:", error); // Exibe o erro no console
    return error;
  }
}

const data: SendOrderParams = {
  service: 2, // Serviço escolhido
  insurance_value: 0, // Sem seguro
  receipt: false, // Sem confirmação de recebimento
  own_hand: false, // Sem entrega em mãos
  reverse: true, // Frete reverso
  non_commercial: true, // Envio não comercial

  from: {
    name: "Felipe Castro",
    address: "Rua João José Rodrigues, 226",
    city: "Hortolândia",
    postal_code: "13185411",
    document: "123.456.789-09", // CPF fictício válido
    phone: "19989435768",
  },

  to: {
    name: "João da Silva",
    address: "Avenida Brasil, 500",
    city: "Campinas",
    postal_code: "13040050",
    document: "987.654.321-00", // CPF fictício válido
    phone: "19999999999",
  },

  volumes: [
    {
      height: 12, // Altura em cm
      width: 18, // Largura em cm
      length: 25, // Comprimento em cm
      weight: 1.5, // Peso em kg
    },
  ],
};

// createCartShippingOrder(data);
