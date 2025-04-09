import { ArrayField, Datagrid, DateField, FunctionField, List, ReferenceField, Show, SimpleShowLayout, TabbedShowLayout, TextField } from "react-admin";
import { summaryReForward, summaryReProcess } from "../http/reprocess";
import { CustomActionButton, LinkedTextField, StatusChip } from "../common/ui-components";
import { maskSensitiveData } from "../common/sensitive";

const summaryStatusColors = new Map<string, string>([
    ['CREATED', 'blue'],
    ['PROCESSING', 'orange'],
    ['DURATION_CONFIG', 'gray'],
    ['ERROR', 'red'],
    ['DONE', 'green'],
]);

const summaryHistoryStatusColors = new Map<string, string>([
    ['SUCCESS', 'green'],    
    ['ERROR', 'red'],
    ['UNPROCESSABLE', 'gray'],
]);

export const SummariesList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
        <TextField source="publicId" />
            <TextField source="connectorName" />
            <ReferenceField source="accountId" reference="accounts" label="Customer / Account PublicId" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <TextField source="customer.name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <TextField source="digitalInteractionId" />
            <TextField source="processorName" />
            <StatusChip source="status" colors={summaryStatusColors} />
            <DateField source="createdAt" showTime={true} />
            <DateField source="updatedAt" showTime={true} />
        </Datagrid>
    </List>
);

export const SummariesShow = () => (
    <Show>
         <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Summary">
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
                <TextField source="processorName" />
                <StatusChip source="status" colors={summaryStatusColors} />
                <DateField source="createdAt" showTime={true} />
                <DateField source="updatedAt" showTime={true} />
                <CustomActionButton label="Reprocessar" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reprocessar este summary?") && 
                    summaryReProcess(record.publicId).then((response) => {
                        alert(`Summary publicId ${response.publicId} reprocessado com sucesso! Status: ${response.status}`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar summary: ${error}`);                                
                    });                            
                }}/>
                <CustomActionButton label="Reencaminhar (gerar a Activity)" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reencaminhar esta summary, com criação da Activity") && 
                    summaryReForward(record.publicId).then((response) => {
                        alert(`Summary publicId ${response.publicId} reprocessado com sucesso!`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar summary: ${error}`);                                
                    });                            
                }}/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Settings">
                <FunctionField
                    source="config"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(maskSensitiveData(record.config), null, 2)}
                        </pre>
                    )}
                />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Input Content">
                <FunctionField
                    source="content"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {record.content}
                        </pre>
                    )}
                />
                <FunctionField
                    source="activityInput"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(record.activityInput, null, 2)}
                        </pre>
                    )}
                />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Result Content">
                <FunctionField
                    source="summary"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {record.summary}
                        </pre>
                    )}
                />                
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Histórico">
                <ArrayField source="history" >
                    <Datagrid bulkActionButtons={false}>
                        <StatusChip source="status" colors={summaryHistoryStatusColors} />
                        <DateField source="timestamp" showTime={true} />
                        <TextField source="detail" />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);