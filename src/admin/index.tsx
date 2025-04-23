import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "../providers/default";
import { Route } from "react-router-dom";
import { AdminLayout } from "./layout";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { CustomerLookup } from "./customer-lookup";
import { CustomerResult } from "../components/customer-result";
import { BigDataCorp } from "./big-data-corp";
import { BigDataCorpResult } from "../components/big-data-corp-result";
import { DocumentResult } from "../components/document-result";

const App = () => (
  <Admin dataProvider={dataProvider} layout={AdminLayout}>
    <Resource name="customer-lookup" options={{ label: 'Consultar Cliente' }} icon={PeopleAltIcon}/>
    <Resource name="big-data-corp" options={{ label: 'Consultar BigDataCorp' }} icon={ContentPasteSearchIcon}/>
    <CustomRoutes>
      <Route path="/customer-lookup" element={<CustomerLookup />} />
      <Route path="/customer-lookup/result" element={<CustomerResult />} />
      <Route path="/document-lookup/result" element={<DocumentResult />} />
      <Route path="/big-data-corp" element={<BigDataCorp />} />
      <Route path="/big-data-corp/result" element={<BigDataCorpResult />} />
    </CustomRoutes>
  </Admin>
  
);

export default App;