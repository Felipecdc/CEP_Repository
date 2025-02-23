import fetchMock from "jest-fetch-mock";
import { getAllOrdersFromApi } from "../getAllOrdersFromApi";

fetchMock.enableMocks();

describe("getAllOrdersFromApi", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve buscar todas as orders de frete", async () => {
    const mockData = {
      current_page: 1,
      data: [
        { id: 1, produto: "Produto A", status: "confirmado" },
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

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const response = await getAllOrdersFromApi();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual(mockData);
  });

  it("deve lidar com uma resposta vazia da api", async () => {
    const mockData = [{}];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const response = await getAllOrdersFromApi();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual(mockData);
  });

  it("deve lidar com orders vazia", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const response = await getAllOrdersFromApi();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/orders",
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

    const response = await getAllOrdersFromApi();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe("Falha ao conectar com a API");
  });
});
