import { useLocation } from 'react-router-dom';
import ValidateShow from '../pages/validate-show';

export const CustomerResult = () => {
  const location = useLocation();
  const customerData = location.state?.customerData;

  if (!customerData) {
    return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
  }

  return (
    <ValidateShow />
  );
};