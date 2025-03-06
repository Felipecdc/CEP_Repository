import "dotenv/config"; // Importa variáveis de ambiente do arquivo .env
import fetchMock from "jest-fetch-mock";
import { removeCartOrder } from "../removeCartOrder"; // Importando a função a ser testada

fetchMock.enableMocks();

describe("removeCartOrder", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve remover o pedido com sucesso", async () => {
    const orderId = "12345";

    fetchMock.mockResponseOnce(
      JSON.stringify({
        success: true,
        status: 200,
        message: "Item excluído do carrinho com sucesso!",
      }),
      { status: 200 }
    );

    const response = await removeCartOrder(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual({
      success: true,
      status: 200,
      data: {
        success: true,
        status: 200,
        message: "Item excluído do carrinho com sucesso!",
      },
    });
  });

  it("deve lidar com erro ao remover pedido", async () => {
    const orderId = "12345";

    fetchMock.mockRejectOnce(new Error("Falha na requisição da API"));

    const response = await removeCartOrder(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      success: false,
      status: 500,
      message: "Falha na requisição da API",
    });
  });

  it("deve lidar com erro de resposta não ok", async () => {
    const orderId = "12345";

    fetchMock.mockResponseOnce("Erro ao remover pedido", { status: 400 });

    const response = await removeCartOrder(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      success: false,
      status: 500,
      message: "Erro 400: Erro ao remover pedido",
    });
  });
});
