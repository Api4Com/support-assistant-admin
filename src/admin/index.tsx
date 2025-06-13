import { Admin, CustomRoutes } from "react-admin";
import { dataProvider, i18nProvider } from "../providers/default";
import { Route } from "react-router-dom";
import { AdminLayout } from "./layout";
import { CustomerLookup } from "./customer-lookup";
import { CustomerLookupEmailResult } from "../components/customer-lookup-email-result";
import { CustomerLookupDocumentResult } from "../components/customer-lookup-document-result";
import { DocumentLookup } from "./document-lookup";
import { DocumentLookupResult } from "../components/document-lookup-result";

const App = () => (
    <Admin
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        layout={AdminLayout}
    >
        <CustomRoutes>
            <Route
                element={<CustomerLookup />}
                path="/customers/lookup" />
            <Route
                element={<CustomerLookupEmailResult />}
                path="/customers/lookup/email/*" />
            <Route
                element={<CustomerLookupDocumentResult />}
                path="/customers/lookup/document" />
            <Route
                element={<DocumentLookup />}
                path="/documents/lookup" />
            <Route
                element={<DocumentLookupResult />}
                path="/documents/lookup/result" />
        </CustomRoutes>
    </Admin>
);

export default App;