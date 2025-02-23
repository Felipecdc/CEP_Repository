import fetchMock from "jest-fetch-mock";
import { getAccountBalance } from "../getAccountBalance";

fetchMock.enableMocks();

describe("getAccountBalance", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve buscar o saldo da conta", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ accounts: [{ balance: 1000 }] })
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

    expect(response).toEqual(1000);
  });
});
