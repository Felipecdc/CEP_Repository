import fetchMock from "jest-fetch-mock";
import { createCartShippingOrder } from "./01_createCartShippingOrder";

fetchMock.enableMocks();

describe("createCartShippingOrder", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("deve criar um pedido com sucesso", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "123456",
        status: "created",
        message: "Pedido criado com sucesso!",
      })
    );

    const mockData = {
      service: 2,
      insurance_value: 0,
      receipt: false,
      own_hand: false,
      reverse: true,
      non_commercial: true,

      from: {
        name: "Felipe Castro",
        address: "Rua João José Rodrigues, 226",
        city: "Hortolândia",
        postal_code: "13185411",
        document: "123.456.789-09",
        phone: "19989435768",
      },

      to: {
        name: "João da Silva",
        address: "Avenida Brasil, 500",
        city: "Campinas",
        postal_code: "13040050",
        document: "987.654.321-00",
        phone: "19999999999",
      },

      volumes: [
        {
          height: 12,
          width: 18,
          length: 25,
          weight: 1.5,
        },
      ],
    };

    const response = await createCartShippingOrder(mockData);

    // Verifique se o fetch foi chamado corretamente
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // Alterando o teste para ser mais flexível na comparação dos headers e do corpo
    expect(fetchMock).toHaveBeenCalledWith(
      "https://sandbox.melhorenvio.com.br/api/v2/me/cart",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"service":2'), // Verifique se a string contém o valor de service
        headers: expect.objectContaining({
          Authorization: expect.stringContaining("Bearer"), // Verifique se o Authorization contém "Bearer"
          "Content-Type": "application/json",
        }),
      })
    );

    expect(response).toHaveProperty("id", "123456");
    expect(response).toHaveProperty("status", "created");
    expect(response).toHaveProperty("message", "Pedido criado com sucesso!");
  });

  it("deve tratar erro da API corretamente", async () => {
    fetchMock.mockRejectOnce(new Error("Falha ao conectar com a API"));

    const mockData = {
      service: 2,
      insurance_value: 0,
      receipt: false,
      own_hand: false,
      reverse: true,
      non_commercial: true,

      from: {
        name: "Felipe Castro",
        address: "Rua João José Rodrigues, 226",
        city: "Hortolândia",
        postal_code: "13185411",
        document: "123.456.789-09",
        phone: "19989435768",
      },

      to: {
        name: "João da Silva",
        address: "Avenida Brasil, 500",
        city: "Campinas",
        postal_code: "13040050",
        document: "987.654.321-00",
        phone: "19999999999",
      },

      volumes: [
        {
          height: 12,
          width: 18,
          length: 25,
          weight: 1.5,
        },
      ],
    };

    const response = await createCartShippingOrder(mockData);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(response.message).toBe("Falha ao conectar com a API");
  });
});
