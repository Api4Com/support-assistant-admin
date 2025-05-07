import { Menu } from 'react-admin';

export const AdminMenu = () => (
    <Menu>
        <Menu.ResourceItem name="customer-lookup" />
        <Menu.ResourceItem name="big-data-corp" />
        <Menu.ResourceItem name="cpf-without-address" />
    </Menu>
);