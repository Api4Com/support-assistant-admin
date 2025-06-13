import { combineDataProviders } from "react-admin";
import restProvider from "./rest-provider";
import { supportAssistantApiUrl } from "../http/client";
export { i18nProvider } from "./i18n-provider";

const api4comProvider = restProvider(supportAssistantApiUrl);

export const dataProvider = combineDataProviders((resource) => {
    switch (resource) {
        case "customers":
        case "searcher-document":
            return api4comProvider;
        default:
            throw new Error(`unknown resource: ${resource}`);
    }
});
