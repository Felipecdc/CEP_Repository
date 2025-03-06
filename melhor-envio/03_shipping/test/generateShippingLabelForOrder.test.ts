import fetchMock from "jest-fetch-mock";
import { generateShippingLabelForOrder } from "../generateShippingLabelForOrder";

fetchMock.enableMocks();

describe("generateShippingLabelForOrder", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve gerar a etiqueta da order", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        "123456": { status: true, message: "Envio gerado com sucesso" },
      })
    );

    const response = await generateShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      "123456": { status: true, message: "Envio gerado com sucesso" },
    });
  });

  it("deve retornar erro quando a resposta da API for inválida", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });

    const response = await generateShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({});
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro do servidor" }),
      { status: 500 }
    );

    const response = await generateShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao gerar etiqueta: {"message":"Erro do servidor"}'
    );
  });

  it("deve lidar com erro de rede", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    const response = await generateShippingLabelForOrder("123456");

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

    const response = await generateShippingLabelForOrder("");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      'Erro ao gerar etiqueta: {"message":"Os dados recebidos sao invalidos.","errors":{"from.postal_code":["O campo from.postal code é obrigatório."],"to.postal_code":["O campo to.postal code é obrigatório."]}}'
    );
  });

  it("deve lidar com erro 404 (não encontrado)", async () => {
    fetchMock.mockResponseOnce("Página não encontrada", { status: 404 });

    const response = await generateShippingLabelForOrder("123456");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Error);
    expect(response.message).toBe(
      "Erro ao gerar etiqueta: Página não encontrada"
    );
  });
});
