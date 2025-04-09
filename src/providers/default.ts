import { combineDataProviders } from "react-admin";
import restProvider from "./rest-provider";
import { connectorsServiceApiKey, connectorsServiceUrl, coreServiceApiKey, coreServiceUrl, interactionsServiceApiKey, interactionsServiceUrl, summariesServiceApiKey, summariesServiceUrl, transcriptionsServiceApiKey, transcriptionsServiceUrl } from "../http/client";


const coreProvider = restProvider(coreServiceUrl, coreServiceApiKey, undefined, undefined,
  new Map<string, string>([
    ['accounts', 'account/accounts'],
    ['customers', 'customer/customers'],
  ])
);
// const billingProvider = restProvider(billingServiceUrl, billingServiceApiKey);

const interactionsProvider = restProvider(interactionsServiceUrl, interactionsServiceApiKey);
const connectorsProvider = restProvider(connectorsServiceUrl, connectorsServiceApiKey);

const transcriptionsProvider = restProvider(transcriptionsServiceUrl, transcriptionsServiceApiKey);
const summariesProvider = restProvider(summariesServiceUrl, summariesServiceApiKey);

export const dataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case 'accounts':
        case 'customers':
          return coreProvider;
        case 'digital-interactions':        
          return interactionsProvider;
        case 'inputs':        
        case 'outputs':        
          return connectorsProvider;
        case 'transcriptions':        
          return transcriptionsProvider;
        case 'summaries':        
          return summariesProvider;
        default:
            throw new Error(`Unknown resource: ${resource}`);
    }
});