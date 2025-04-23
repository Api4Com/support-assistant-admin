import { useLocation } from 'react-router-dom';
import BigDataCorpShow from '../pages/big-data-corp-show';

export const BigDataCorpResult = () => {
  const location = useLocation();
  const bigDataCorpData = location.state?.bigDataCorpData;

  if (!bigDataCorpData) {
    return <div>Nenhum dado de cliente encontrado. Volte e tente novamente.</div>;
  }

  return (
    <BigDataCorpShow />
  );
};