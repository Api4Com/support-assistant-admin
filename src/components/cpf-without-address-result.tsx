import { useLocation } from 'react-router-dom';
import CpfWithoutAddressShow from '../pages/cpf-without-address-show';

export const CpfWithoutAddressResult = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;

  if (!resultData) {
    return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
  }

  return (
    <CpfWithoutAddressShow />
  );
};