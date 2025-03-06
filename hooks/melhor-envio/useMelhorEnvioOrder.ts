import { getAllOrdersFromApi } from "../../melhor-envio/02_order/getAllOrdersFromApi";
import { getOrdersByStatusFromApi } from "../../melhor-envio/02_order/getOrdersByStatusFromApi";

export const useMelhorEnvioOrder = () => {
  return {
    // import files to order
    getAllOrdersFromApi,
    getOrdersByStatusFromApi,
  };
};
