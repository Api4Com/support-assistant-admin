import { ArrayField, Datagrid, DateField, FunctionField, List, ReferenceField, Show, SimpleShowLayout, TabbedShowLayout, TextField, UrlField } from "react-admin";
import { transcriptionReForward, transcriptionReProcess } from "../http/reprocess";
import { CustomActionButton, LinkedTextField, StatusChip } from "../common/ui-components";
import { maskSensitiveData } from "../common/sensitive";

const transcriptionStatusColors = new Map<string, string>([
    ['CREATED', 'blue'],
    ['PROCESSING', 'orange'],
    ['DURATION_CONFIG', 'gray'],
    ['ERROR', 'red'],
    ['DONE', 'green'],
]);

const transcriptionHistoryStatusColors = new Map<string, string>([
    ['SUCCESS', 'green'],    
    ['ERROR', 'red'],
    ['UNPROCESSABLE', 'gray'],
]);


export const TranscriptionsList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="connectorName" />
            <ReferenceField source="accountId" reference="accounts" label="Customer / Account PublicId" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <TextField source="customer.name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <TextField source="digitalInteractionId" />
            <StatusChip source="status" colors={transcriptionStatusColors} />
            <DateField source="createdAt" showTime={true} />
            <DateField source="updatedAt" showTime={true} />
        </Datagrid>
    </List>
);

export const TranscriptionsShow = () => (
    <Show>
         <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Transcription">
                <TextField source="publicId" />
                <TextField source="connectorName" />
                <ReferenceField source="accountId" reference="accounts" label="Account" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <SimpleShowLayout>
                        <TextField source="customer.name" />
                        <TextField source="name"/>
                        <TextField source="publicId"/>
                    </SimpleShowLayout>
                </ReferenceField>
                <LinkedTextField source="digitalInteractionId" targetResource="digital-interactions" />
                <StatusChip source="status" colors={transcriptionStatusColors} />
                <DateField source="createdAt" showTime={true} />
                <DateField source="updatedAt" showTime={true} />
                <CustomActionButton label="Reprocessar" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reprocessar este transcription?") && 
                    transcriptionReProcess(record.publicId).then((response) => {
                        alert(`Transcription publicId ${response.publicId} reprocessado com sucesso! Status: ${response.status}`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar transcription: ${error}`);                                
                    });                            
                }}/>
                <CustomActionButton label="Reencaminhar (gerar a Activity)" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reencaminhar esta transcription, com criação da Activity") && 
                    transcriptionReForward(record.publicId).then((response) => {
                        alert(`Transcription publicId ${response.publicId} reprocessado com sucesso!`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar transcription: ${error}`);                                
                    });                            
                }}/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Settings">
                <FunctionField
                    source="configuration"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(maskSensitiveData(record.configuration), null, 2)}
                        </pre>
                    )}
                />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Input Content">
                <TextField source="contentRef" />        
                <UrlField source="contentRef" content="Acessar conteúdo"/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Result Content">
                <FunctionField
                    source="transcription"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {record.transcription}
                        </pre>
                    )}
                />                
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Histórico">
                <ArrayField source="history" >
                    <Datagrid bulkActionButtons={false}>
                        <StatusChip source="status" colors={transcriptionHistoryStatusColors} />
                        <DateField source="timestamp" showTime={true} />
                        <TextField source="detail" />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);