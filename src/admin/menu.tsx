import { Menu } from 'react-admin';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Divider from '@mui/material/Divider';


export const AdminMenu = () => (
    <Menu>
        {/* <Menu.DashboardItem /> */}
        <Divider textAlign="left">Core</Divider>
        {/* <Menu.ResourceItems /> */}
        <Menu.ResourceItem name="customers"  />
        <Menu.ResourceItem name="accounts"  />
        <Divider textAlign="left">Interactions</Divider>
        <Menu.ResourceItem name="inputs"  />
        <Menu.ResourceItem name="digital-interactions"  />
        <Menu.ResourceItem name="transcriptions"  />
        <Menu.ResourceItem name="summaries"  />
        <Menu.ResourceItem name="outputs" />        
        <Divider textAlign="left">Monitoramento</Divider>
        <Menu.Item to="/health" primaryText="Health Services" leftIcon={<MonitorHeartIcon />}/>
    </Menu>
);