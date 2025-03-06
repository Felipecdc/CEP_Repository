import fetchMock from "jest-fetch-mock";
import { checkoutOrderCreate } from "../checkoutOrderCreate";

fetchMock.enableMocks();

describe("checkoutOrderCreate", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve fazer o checkout do pedido", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: "123456", status: "paid" })
    );

    const response = await checkoutOrderCreate("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/checkout",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );

    expect(response).toEqual({ id: "123456", status: "paid" });
  });

  it("deve retornar erro quando a resposta da API for inválida", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await checkoutOrderCreate("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({});
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro do servidor" }),
      { status: 500 }
    );

    const response = await checkoutOrderCreate("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao fazer checkout: {"message":"Erro do servidor"}'
    );
  });

  it("deve lidar com erro de rede", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    const response = await checkoutOrderCreate("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toEqual("Network error");
  });

  it("deve lidar com erro 422 (dados inválidos)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        message: "Os dados recebidos sao invalidos.",
        errors: {
          "from.postal_code": ["O campo from.postal code é obrigatório."],
          "to.postal_code": ["O campo to.postal code é obrigatório."],
        },
      }),
      { status: 422 }
    );

    const response = await checkoutOrderCreate("");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      'Erro ao fazer checkout: {"message":"Os dados recebidos sao invalidos.","errors":{"from.postal_code":["O campo from.postal code é obrigatório."],"to.postal_code":["O campo to.postal code é obrigatório."]}}'
    );
  });

  it("deve lidar com erro 404 (não encontrado)", async () => {
    fetchMock.mockResponseOnce("Página não encontrada", { status: 404 });

    const response = await checkoutOrderCreate("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      "Erro ao fazer checkout: Página não encontrada"
    );
  });
});

// throw new Error(`Erro ao fazer checkout: ${errorDetails}`); // Lança erro com os detalhes
