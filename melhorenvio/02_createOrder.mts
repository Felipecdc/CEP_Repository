import "dotenv/config";

interface Address {
  name: string;
  address: string;
  city: string;
  postal_code: string;
  document: string;
  phone: string;
}

interface Volume {
  height: number;
  width: number;
  length: number;
  weight: number;
}

interface SendOrderParams {
  service: number;
  insurance_value: number;
  receipt: boolean;
  own_hand: boolean;
  reverse: boolean;
  non_commercial: boolean;
  from: Address;
  to: Address;
  volumes: Volume[];
}

export async function createOrder(data: SendOrderParams) {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const requestBody = {
    service: data.service,
    options: {
      insurance_value: data.insurance_value,
      receipt: data.receipt,
      own_hand: data.own_hand,
      reverse: data.reverse,
      non_commercial: data.non_commercial,
    },
    from: data.from,
    to: data.to,
    volumes: data.volumes,
  };

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": "minhaaplicacao@example.com",
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro do catch:", error);
  }
}
