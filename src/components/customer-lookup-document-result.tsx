import { useLocation } from "react-router-dom";
import CustomerLookupDocumentShow from "../pages/customer-lookup-document-show";

export const CustomerLookupDocumentResult = () => {
    const location = useLocation();
    const customerDocumentData = location.state?.customerDocumentData;

    if (!customerDocumentData) {
        return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
    }

    return (
        <CustomerLookupDocumentShow />
    );
};