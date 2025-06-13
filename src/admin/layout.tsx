import { Layout } from "react-admin";
import { AdminMenu } from "./menu";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => (
    <Layout
        menu={AdminMenu}>
        {children}
    </Layout>
);
