import fetchMock from "jest-fetch-mock";
import { getAccountBalance } from "../getAccountBalance";

fetchMock.enableMocks();

describe("getAccountBalance", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve buscar o saldo da conta com sucesso", async () => {
    // Simulando uma resposta de sucesso
    fetchMock.mockResponseOnce(
      JSON.stringify({ accounts: [{ balance: 1000 }] }),
      { status: 200 } // Status HTTP 200
    );

    const response = await getAccountBalance();

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

    // Verifica se o saldo retornado é correto
    expect(response).toEqual(1000);
  });

  it("deve retornar erro quando a resposta da API for inválida", async () => {
    // Simulando uma resposta com dados inválidos
    fetchMock.mockResponseOnce(
      JSON.stringify({ accounts: [] }),
      { status: 200 } // Status HTTP 200, mas sem dados válidos
    );

    const response = await getAccountBalance();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual(0); // Espera-se que retorne 0 se não encontrar saldo
  });

  it("deve lidar com erro de rede", async () => {
    // Simulando uma falha de rede
    fetchMock.mockRejectOnce(new Error("Falha na conexão"));

    const response = await getAccountBalance();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toContain("Falha na conexão"); // Verifica se a mensagem contém a string esperada
  });

  it("deve lidar com resposta de erro do servidor (500)", async () => {
    // Simulando um erro do servidor (500)
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Erro no servidor" }),
      { status: 500 }
    );

    const response = await getAccountBalance();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe(
      'Erro ao buscar saldo: {"message":"Erro no servidor"}'
    ); // Ajuste conforme o formato correto do erro
  });
});
