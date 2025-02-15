export const removeOrder = async (orderId: string) => {
  const token = process.env.MELHOR_ENVIO_AUTH_TOKEN;

  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "Aplicação (email para contato técnico)",
    },
  };

  try {
    const response = await fetch(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      options
    );

    const text = await response.text();

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${text}`);
    }

    try {
      const data = JSON.parse(text);
      return {
        success: true,
        status: response.status,
        data,
      };
    } catch {
      return {
        status: response.status,
        success: true,
        message: "Item excluído do carrinho com sucesso!",
      };
    }
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
};
