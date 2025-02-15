import { consultOrder } from "./melhorenvio/04_getOrderCart.mjs";
import { inOrder } from "./melhorenvio/03_getAllOrdersCart.mjs";
import { removeOrder } from "./melhorenvio/05_removeOrder.mjs";
import { sendOrder } from "./melhorenvio/02_createOrder.mjs";
import { shippingCost } from "./melhorenvio/01_calculateShipping.mjs";

// PRIMEIRA ETAPA - CALCULAR O FRETE
//
// const response = await shippingCost("69880000", "13185411");
// console.log(response);

//-----------------------------------------------------------------

// SEGUNDA ETAPA - CRIANDO UMA ORDER
//
// const data = {
//   service: 3,
//   insurance_value: 1,
//   receipt: true,
//   own_hand: false,
//   reverse: true,
//   non_commercial: true,
//   from: {
//     name: "Remetente Exemplo",
//     address: "Rua Exemplo, 123",
//     city: "São Paulo",
//     postal_code: "69880000",
//     document: "12345678909",
//     phone: "19989435768",
//   },
//   to: {
//     name: "Destinatário Exemplo",
//     address: "Avenida Exemplo, 456",
//     city: "Campinas",
//     postal_code: "13185411",
//     document: "98765432100",
//     phone: "19989435768",
//   },
//   volumes: [
//     { height: 10, width: 30, length: 30, weight: 1 },
//     { height: 2, width: 5, length: 15, weight: 0.3 },
//     { height: 60, width: 20, length: 30, weight: 2.5 },
//   ],
// };
// const response = await sendOrder(data);
// console.log(response);

//-----------------------------------------------------------------

// TERCEIRA ETAPA - CONSULTAR ORDER CRIADA
//
// const response = await consultOrder("9e2bdadd-40fe-45f8-a777-d8b438f94c55");
// console.log(response);

//-----------------------------------------------------------------

// ESTAPA EXTRA - REMOVENDO UMA ORDER
//
// const response = await removeOrder("9e29c290-81c5-45e4-9e58-1e35e76f6793");
// console.log(response);

//-----------------------------------------------------------------

// ETAPA EXTRA - VERIFICANDO CARRINHO
//
// const response = await inOrder();
// console.log(response);

// Arquivos que fizemos ate agora
// 01_calculateShipping.mts
// 02_createOrder.mts
// 03_getAllOrdersCart.mts
// 04_getOrderCart.mts
// 05_removeOrder.mts
// 06_checkoutOrder.mts
// 07_confirmOrder.mts
// 08_generateLabel.mts
// 09_printLabel.mts
// 10_trackShipment.mts - ainda vamos fazer
// 11_notifyClient.mts - ainda vamos fazer
