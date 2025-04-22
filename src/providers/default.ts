import { combineDataProviders } from "react-admin";
import restProvider from "./rest-provider";
import { supportAssistantApiUrl } from "../http/client";

const api4comProvider = restProvider(supportAssistantApiUrl);

export const dataProvider = combineDataProviders((resource) => {
  if (resource === 'customer-lookup') return api4comProvider;
  else throw new Error(`Unknown resource: ${resource}`);
});