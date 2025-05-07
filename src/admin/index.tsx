import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "../providers/default";
import { Route } from "react-router-dom";
import { AdminLayout } from "./layout";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { CustomerLookup } from "./customer-lookup";
import { CustomerResult } from "../components/customer-result";
import { BigDataCorp } from "./big-data-corp";
import { BigDataCorpResult } from "../components/big-data-corp-result";
import { CpfWithoutAddress } from "./cpf-without-address";
import { CpfWithoutAddressResult } from "../components/cpf-without-address-result";
import { DocumentResult } from "../components/document-result";

const App = () => (
  <Admin dataProvider={dataProvider} layout={AdminLayout}>
    <Resource name="customer-lookup" options={{ label: 'Consultar Cliente' }} icon={PeopleAltIcon}/>
    <Resource name="big-data-corp" options={{ label: 'Consultar BigDataCorp' }} icon={ContentPasteSearchIcon}/>
    <Resource name="cpf-without-address" options={{ label: 'CPF Sem Endereço' }} icon={AddHomeIcon}/>
    <CustomRoutes>
      <Route path="/customer-lookup" element={<CustomerLookup />} />
      <Route path="/customer-lookup/result" element={<CustomerResult />} />
      <Route path="/document-lookup/result" element={<DocumentResult />} />
      <Route path="/big-data-corp" element={<BigDataCorp />} />
      <Route path="/big-data-corp/result" element={<BigDataCorpResult />} />
      <Route path="/cpf-without-address" element={<CpfWithoutAddress />} />
      <Route path="/cpf-without-address/result" element={<CpfWithoutAddressResult />} />
    </CustomRoutes>
  </Admin>
  
);

export default App;