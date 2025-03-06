import fetchMock from "jest-fetch-mock";
import { calculateShippingCost } from "../calculateShippingCost";

fetchMock.enableMocks();

describe("calculateShippingCost", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve calcular o frete corretamente para uma região válida", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ id: 1, name: "PAC", price: 12.79 })
    );

    const response = await calculateShippingCost({
      cepOrigim: "12345",
      cepDestino: "67890",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
        body: expect.stringContaining('"from":{"postal_code":"12345"}'),
      })
    );
    expect(response).toEqual({ id: 1, name: "PAC", price: 12.79 });
  });

  it("deve retornar erro quando a resposta da API for inválida (vazia)", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await calculateShippingCost({
      cepOrigim: "12345",
      cepDestino: "67890",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({});
  });

  it("deve lidar corretamente com erro 500 (erro interno do servidor)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro do servidor" }),
      { status: 500 }
    );

    const response = await calculateShippingCost({
      cepOrigim: "12345",
      cepDestino: "67890",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      'Erro ao calcular o frete: {"message":"Erro do servidor"}'
    );
  });

  it("deve lidar corretamente com erro de rede", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    const response = await calculateShippingCost({
      cepOrigim: "12345",
      cepDestino: "67890",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
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

    const response = await calculateShippingCost({
      cepOrigim: "",
      cepDestino: "",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      'Erro ao calcular o frete: {"message":"Os dados recebidos sao invalidos.","errors":{"from.postal_code":["O campo from.postal code é obrigatório."],"to.postal_code":["O campo to.postal code é obrigatório."]}}'
    );
  });

  it("deve lidar com erro 404 (não encontrado)", async () => {
    fetchMock.mockResponseOnce("Página não encontrada", { status: 404 });

    const response = await calculateShippingCost({
      cepOrigim: "12345",
      cepDestino: "67890",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      "Erro ao calcular o frete: Página não encontrada"
    );
  });
});
