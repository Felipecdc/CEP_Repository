import { createCartShippingOrder } from "../../melhor-envio/01_cart/createCartShippingOrder";
import { getAllCartOrders } from "../../melhor-envio/01_cart/getAllCartOrders";
import { getCartOrderDetails } from "../../melhor-envio/01_cart/getCartOrderDetails";
import { removeCartOrder } from "../../melhor-envio/01_cart/removeCartOrder";

export const useMelhorEnvioCart = () => {
  return {
    // import files to cart
    createCartShippingOrder,
    getAllCartOrders,
    getCartOrderDetails,
    removeCartOrder,
  };
};
