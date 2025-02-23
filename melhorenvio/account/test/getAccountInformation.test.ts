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
});
