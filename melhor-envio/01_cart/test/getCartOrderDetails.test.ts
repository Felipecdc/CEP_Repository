import fetchMock from "jest-fetch-mock";
import { getCartOrderDetails } from "../getCartOrderDetails";

fetchMock.enableMocks();

describe("getCartOrderDetail", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve receber detalhes de uma order do cart", async () => {
    const orderId = "123456";

    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          id: orderId,
          status: "pending",
          price: 20.5,
          created_at: "2024-02-19T12:00:00Z",
          updated_at: "2024-02-19T14:00:00Z",
          volumes: [
            {
              id: 1,
              weight: 1.5,
              width: 10,
              height: 5,
              length: 20,
            },
          ],
        },
      ])
    );

    const response = await getCartOrderDetails(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://sandbox.melhorenvio.com.br/api/v2/me/cart/${orderId}`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual([
      {
        id: orderId,
        status: "pending",
        price: 20.5,
        created_at: "2024-02-19T12:00:00Z",
        updated_at: "2024-02-19T14:00:00Z",
        volumes: [
          {
            id: 1,
            weight: 1.5,
            width: 10,
            height: 5,
            length: 20,
          },
        ],
      },
    ]);
  });

  it("deve lidar com o erro na requisição da API", async () => {
    fetchMock.mockRejectOnce(new Error("Erro ao buscar order no cart"));

    const orderId = "123456";

    const response = await getCartOrderDetails(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe("Erro ao buscar order no cart");
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro no servidor" }),
      { status: 500 }
    );

    const orderId = "123456";

    const response = await getCartOrderDetails(orderId);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao buscar detalhes da order: {"message":"Erro no servidor"}'
    );
  });
});
