import moment from 'moment';

import {
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    FunctionField,
    useRecordContext,
  } from 'react-admin';
  import { Typography } from '@mui/material';
  import { useLocation } from 'react-router-dom';
  
  const BigDataCorpShow = () => {
    const record = useRecordContext();
    const location = useLocation();
  
    const bigDataCorpData = record || location.state?.bigDataCorpData;
    const isCNPJ = bigDataCorpData?.isCNPJ;
      
    if (!bigDataCorpData?.Result?.[0]) {
      return <div>Carregando dados do cliente...</div>;
    }
  
    return (
      <Show resource="big-data-corp" id={bigDataCorpData.id || 'bigdatacorp-result'}>
        <SimpleShowLayout record={bigDataCorpData}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2, fontWeight: 'bold' }}>
            Dados - BigDataCorp
          </Typography>

          <FunctionField
            label={isCNPJ ? "Razão Social" : "Nome Completo"}
            render={(record: any) =>
              record?.isCNPJ
                ? record?.Result?.[0]?.RegistrationData?.BasicData?.OfficialName
                : record?.Result?.[0]?.RegistrationData?.BasicData?.Name
            }
          />

          <FunctionField
            label={isCNPJ ? "Nome Fantasia" : false}
            render={(record: any) =>
              record?.isCNPJ ? record?.Result?.[0]?.RegistrationData?.BasicData?.TradeName || 'Não informado' : false
            }
          />

          <TextField source="Result[0].RegistrationData.BasicData.TaxIdNumber" label="CPF/CNPJ" />
          <FunctionField
            label={isCNPJ ? "Natureza Jurídica" : false}
            render={(record: any) =>
              record?.isCNPJ
                ? record?.Result?.[0]?.RegistrationData?.BasicData?.LegalNature?.Activity || 'Não informado'
                : false
            }
          />
          <FunctionField
            label={isCNPJ ? "Capital Social" : false}
            render={(record: any) =>
              record?.isCNPJ
                ? record?.Result?.[0]?.RegistrationData?.BasicData?.AdditionalOutputData?.Capital || 'Não informado'
                : false
            }
          />

          <FunctionField
            label="Situação do Documento"
            render={(record: any) => {
              const status = record?.Result?.[0]?.RegistrationData?.BasicData?.TaxIdStatus;
              const statusMap: Record<string, string> = {
                REGULAR: 'Regular',
                SUSPENDED: 'Suspenso',
                CANCELED: 'Cancelado',
                ATIVA: 'Ativa',
                INAPTA: 'Inapta',
                BAIXADA: 'Baixada',
              };
              return statusMap[status] || status || 'Não informado';
            }}
          />
          <DateField source="Result[0].RegistrationData.BasicData.TaxIdStatusDate" label="Data da Situação" />

          <FunctionField
            label={isCNPJ ? false : "Gênero"}
            render={(record: any) =>
              record?.isCNPJ ? false : record?.Result?.[0]?.RegistrationData?.BasicData?.Gender || 'Não informado'
            }
          />
          <FunctionField
            label={isCNPJ ? false : "Data de Nascimento"}
            render={(record: any) =>
              record?.isCNPJ 
              ? false 
              : moment.utc(record?.Result?.[0]?.RegistrationData?.BasicData?.BirthDate).format('DD/MM/YYYY') || 'Não informado'
            }
          />
          <FunctionField
            label={isCNPJ ? false : "Data no Registro"}
            render={(record: any) =>
              record?.isCNPJ
                ? false
                : moment.utc(record?.Result?.[0]?.RegistrationData?.BasicData?.CapturedBirthDateFromRFSource).format('DD/MM/YYYY') || 'Não informado'
            }
          />
          <FunctionField
            label={isCNPJ ? false : "Data de Nascimento Validada?"}
            render={(record: any) =>
              record?.isCNPJ
                ? false
                : record?.Result?.[0]?.RegistrationData?.BasicData?.IsValidBirthDateInRFSource
                ? 'Sim'
                : 'Não'
            }
          />
          <FunctionField
            label={isCNPJ ? false : "Nome da Mãe"}
            render={(record: any) =>
              record?.isCNPJ ? false : record?.Result?.[0]?.RegistrationData?.BasicData?.MotherName || 'Não informado'
            }
          />
  
          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Endereço
          </Typography>
          <TextField source="Result[0].RegistrationData.Addresses.Primary.AddressMain" label="Logradouro" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.Number" label="Número" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.Complement" label="Complemento" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.Neighborhood" label="Bairro" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.City" label="Cidade" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.State" label="Estado" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.ZipCode" label="CEP" />
          <TextField source="Result[0].RegistrationData.Addresses.Primary.Country" label="País" />
          <FunctionField
            label="Tipo de Endereço"
            render={(record: any) => {
              const type = record?.Result?.[0]?.RegistrationData?.Addresses?.Primary?.Type;
              const typeMap: Record<string, string> = {
                HOME: 'Residencial',
                WORK: 'Comercial',
                'OFFICIAL REGISTRATION': 'Registro Oficial',
              };
              return typeMap[type] || type || 'Não informado';
            }}
          />
          <DateField source="Result[0].RegistrationData.Addresses.Primary.LastUpdateDate" label="Última Atualização" />
  
          <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            Contatos
          </Typography>
          <FunctionField
            label="Telefone Principal"
            render={(record: any) => {
              const phone = record?.Result[0]?.RegistrationData?.Phones?.Primary;
              return phone ? `+${phone.CountryCode} (${phone.AreaCode}) ${phone.Number}` : 'Não informado';
            }}
          />
          <FunctionField
            label="Tipo de Telefone"
            render={(record: any) => {
              const type = record?.Result?.[0]?.RegistrationData?.Phones?.Primary?.Type;
              const typeMap: Record<string, string> = {
                MOBILE: 'Celular',
                LANDLINE: 'Fixo',
              };
              return typeMap[type] || type || 'Não informado';
            }}
          />
          <DateField source="Result[0].RegistrationData.Phones.Primary.LastUpdateDate" label="Última Atualização" />
        </SimpleShowLayout>
      </Show>
    );
  };
  
  export default BigDataCorpShow;  
