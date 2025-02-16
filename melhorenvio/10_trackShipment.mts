// 9e37daef-844e-4628-8d49-f660206fe682
//   9e37da93-6a82-45dd-a815-3d5590500a5e - esse funcionou, se nao me engano foi o segundo id, id do checkcout acredito
//   9e37daef-7d10-4189-932b-a654b56b2695
import "dotenv/config";

export const trackShipment = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Aplicação (email para contato técnico)",
    },
    body: JSON.stringify({
      orders: [orderId], // Aqui deve ser um array com os IDs dos pedidos
    }),
  };

  try {
    const response = await fetch(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/tracking",
      options
    );

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Erro ao enviar o pedido: ${errorDetails}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

const response = await trackShipment("9e37da93-6a82-45dd-a815-3d5590500a5e");
console.log(response);
