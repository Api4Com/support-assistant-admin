import { useLocation } from "react-router-dom";
import DocumentLookupShow from "../pages/document-lookup-show";

export const DocumentLookupResult = () => {
    const location = useLocation();
    const documentData = location.state?.documentData;

    if (!documentData) {
        return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
    }

    return (
        <DocumentLookupShow />
    );
};