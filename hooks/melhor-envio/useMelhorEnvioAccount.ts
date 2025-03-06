import { getAccountBalance } from "../../melhor-envio/account/getAccountBalance";
import { getAccountInformation } from "../../melhor-envio/account/getAccountInformation";

export const useMelhorEnvioAccount = () => {
  return {
    // import files to account
    getAccountInformation,
    getAccountBalance,
  };
};
