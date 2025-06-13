import { useLocation } from "react-router-dom";
import CustomerLookupEmailShow from "../pages/customer-lookup-email-show";

export const CustomerLookupEmailResult = () => {
    const location = useLocation();
    const customerEmailData = location.state?.customerEmailData;

    if (!customerEmailData) {
        return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
    }

    return (
        <CustomerLookupEmailShow />
    );
};