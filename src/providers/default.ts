import { combineDataProviders } from "react-admin";
import restProvider from "./rest-provider";
import { supportAssistantApiUrl } from "../http/client";

const api4comProvider = restProvider(supportAssistantApiUrl);

export const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case 'customer-lookup':
    case 'big-data-corp':
    case 'cpf-without-address':
      return api4comProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});