import fetchMock from "jest-fetch-mock";
import { getAccountInformation } from "../getAccountInformation";

fetchMock.enableMocks();

describe("getAccountInformation", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve buscar informacoes sobre o usuario", async () => {
    const mockData = {
      id: "123456",
      email: "felipecdc09@gmail.com",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const response = await getAccountInformation();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"),
        }),
      })
    );
    expect(response).toEqual(mockData);
  });

  it("deve lidar com erro de rede", async () => {
    // Simulando uma falha de rede
    fetchMock.mockRejectOnce(new Error("Falha na conexão"));

    const response = await getAccountInformation();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toContain("Falha na conexão"); // Verifica se a mensagem contém a string esperada
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    // Simulando um erro do servidor (500)
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro no servidor" }),
      { status: 500 }
    );

    const response = await getAccountInformation();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao buscar dados: {"message":"Erro no servidor"}'
    ); // Ajuste conforme o formato correto do erro
  });
});
