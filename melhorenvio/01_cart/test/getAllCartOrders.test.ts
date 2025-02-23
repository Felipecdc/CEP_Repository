import fetchMock from "jest-fetch-mock";
import { getAllCartOrders } from "../getAllCartOrders";

fetchMock.enableMocks();

describe("createCartShippingOrder", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve receber as orders do cart", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          id: 12345,
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

    const response = await getAllCartOrders();

    expect(response).toEqual([
      {
        id: 12345,
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

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );
  });

  it("deve lidar com o erro na requisição", async () => {
    fetchMock.mockRejectOnce(new Error("Falha na requisição da API"));

    const response = await getAllCartOrders();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe("Falha na requisição da API");
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro no servidor" }),
      { status: 500 }
    );

    const response = await getAllCartOrders();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao enviar o pedido: {"message":"Erro no servidor"}'
    );
  });
});
