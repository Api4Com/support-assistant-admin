import { useLocation } from 'react-router-dom';
import ValidateDocumentShow from '../pages/validate-document-show';

export const DocumentResult = () => {
  const location = useLocation();
  const documentData = location.state?.documentData;

  if (!documentData) {
    return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
  }

  return (
    <ValidateDocumentShow />
  );
};