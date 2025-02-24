import fetchMock from "jest-fetch-mock";
import { printShippingLabelForOrder } from "../04_printShippingLabelForOrder";

fetchMock.enableMocks();

describe("printShippingLabelForOrder", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve gerar o link para print da etiqueta", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ url: "https://example.com/track/12345" })
    );

    const response = await printShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({ url: "https://example.com/track/12345" });
  });

  it("deve retornar erro quando a resposta da API for inválida", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await printShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({});
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro do servidor" }),
      { status: 500 }
    );

    const response = await printShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao gerar link: {"message":"Erro do servidor"}'
    );
  });

  it("deve lidar com erro de rede", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    const response = await printShippingLabelForOrder("123456");

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

    const response = await printShippingLabelForOrder("");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      'Erro ao gerar link: {"message":"Os dados recebidos sao invalidos.","errors":{"from.postal_code":["O campo from.postal code é obrigatório."],"to.postal_code":["O campo to.postal code é obrigatório."]}}'
    );
  });

  it("deve lidar com erro 404 (não encontrado)", async () => {
    fetchMock.mockResponseOnce("Página não encontrada", { status: 404 });

    const response = await printShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe("Erro ao gerar link: Página não encontrada");
  });
});
