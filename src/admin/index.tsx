import { Admin, CustomRoutes, Resource } from "react-admin";
import { InterationsList, InterationsShow } from "./interactions";
import { dataProvider } from "../providers/default";
import { Route } from "react-router-dom";
import Health from "./health";
import { AdminLayout } from "./layout";
import { InputsList, InputsShow } from "./inputs";
import { OutputsList, OutputsShow } from "./outputs";
import { TranscriptionsList, TranscriptionsShow } from "./transcriptions";
import { SummariesList, SummariesShow } from "./summaries";
import { CustomersList, CustomersShow } from "./customers";
import { AccountsList, AccountsShow } from "./accounts";
import VoiceChatIcon from '@mui/icons-material/VoiceChat';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const App = () => (
  <Admin dataProvider={dataProvider} layout={AdminLayout}>
    <Resource name="customers" options={{ label: 'Core / Customers' }} list={CustomersList} show={CustomersShow} icon={PeopleAltIcon}/>
    <Resource name="accounts" options={{ label: 'Core / Accounts' }} list={AccountsList} show={AccountsShow} icon={ManageAccountsIcon}/>
    <Resource name="inputs" options={{ label: 'Raw Inputs' }} list={InputsList} show={InputsShow} icon={CloudUploadIcon}/>
    <Resource name="digital-interactions" list={InterationsList} show={InterationsShow} options={{ label: 'Digital Interactions' }} icon={SupportAgentIcon}/>
    <Resource name="transcriptions" options={{ label: 'Transcriptions' }} list={TranscriptionsList} show={TranscriptionsShow} icon={VoiceChatIcon}/>
    <Resource name="summaries" options={{ label: 'Summaries' }} list={SummariesList} show={SummariesShow} icon={DescriptionIcon}/>
    <Resource name="outputs" options={{ label: 'Raw Outputs' }} list={OutputsList} show={OutputsShow} icon={CloudDownloadIcon}/>
    
    <CustomRoutes>
        <Route path="/health" element={<Health />} />
    </CustomRoutes>
  </Admin>
  
);

export default App;