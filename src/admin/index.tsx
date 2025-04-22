import { Admin, CustomRoutes, Resource } from "react-admin";
import { dataProvider } from "../providers/default";
import { Route } from "react-router-dom";
import { AdminLayout } from "./layout";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { CustomerLookup } from "./customer-lookup";
import { CustomerResult } from "../components/customer-result";

const App = () => (
  <Admin dataProvider={dataProvider} layout={AdminLayout}>
    <Resource name="customer-lookup" options={{ label: 'Consultar Cliente' }} icon={PeopleAltIcon}/>
    <CustomRoutes>
      <Route path="/customer-lookup" element={<CustomerLookup />} />
      <Route path="/customer-lookup/result" element={<CustomerResult />} />
    </CustomRoutes>
  </Admin>
  
);

export default App;