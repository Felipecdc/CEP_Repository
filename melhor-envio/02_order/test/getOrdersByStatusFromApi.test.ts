import fetchMock from "jest-fetch-mock";
import { getOrdersByStatusFromApi } from "../getOrdersByStatusFromApi";

fetchMock.enableMocks();

describe("getOrdersByStatusFromApi", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve buscar todas as orders baseada em status", async () => {
    const mockData = {
      current_page: 1,
      data: [
        { id: 1, produto: "Produto A", status: "pendente" },
        { id: 2, produto: "Produto B", status: "pendente" },
      ],
      first_page_url:
        "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
      from: 1,
      last_page: 1,
      last_page_url:
        "https://sandbox.melhorenvio.com.br/api/v2/me/orders?page=1",
      links: [],
      next_page_url: null,
      path: "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
      per_page: 10,
      prev_page_url: null,
      to: 2,
      total: 2,
    };

    const status = "pendente";

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const response = await getOrdersByStatusFromApi(status);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://sandbox.melhorenvio.com.br/api/v2/me/orders?status=${status}`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual(mockData);
    response.data.forEach((order: { status: string }) => {
      expect(order.status).toBe(status);
    });
  });

  it("deve lidar com orders vazia", async () => {
    const status = "pendente";

    fetchMock.mockResponseOnce(JSON.stringify({}));

    const response = await getOrdersByStatusFromApi(status);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://sandbox.melhorenvio.com.br/api/v2/me/orders?status=${status}`,
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );
    expect(response).toEqual({});
  });

  it("deve tratar erro da API corretamente", async () => {
    fetchMock.mockRejectOnce(new Error("Falha ao conectar com a API"));

    const status = "pendente";

    const response = await getOrdersByStatusFromApi(status);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe("Falha ao conectar com a API");
  });
});
