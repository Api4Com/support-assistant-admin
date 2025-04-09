import { ArrayField, Button, Datagrid, DateField, FunctionField, List, ReferenceField, ReferenceOneField, Show, SimpleShowLayout, TabbedShowLayout, TextField, useRecordContext, useRedirect } from "react-admin";
import { rawInputReProcess } from "../http/reprocess";
import { maskSensitiveData } from "../common/sensitive";
import { CustomActionButton, LinkedTextField, StatusChip } from "../common/ui-components";

const rawInputStatusColors = new Map<string, string>([
    ['RECEIVED', 'blue'],
    ['FORWARDED', 'green'],
    ['FORWARDING_ERROR', 'red'],
]);

const rawInputHistoryStatusColors = new Map<string, string>([
    ['SUCCESS', 'green'],
    ['ERROR', 'red'],
]);

const RawOutputButton = () => {
    const redirect = useRedirect();
    const record = useRecordContext();
    
    return (
        <Button 
            onClick={() => record && redirect(`/outputs/${record.publicId}/show`)}
            variant="outlined" color="primary" size="small">
            Ver Raw Output
        </Button>
    );
};

export const InputsList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="data.connectorName" />
            <TextField source="data.accountId" />
            <ReferenceField source="data.accountId" reference="accounts" label="Customer / Account PublicId" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <TextField source="customer.name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <TextField source="digitalInteractionId" />            
            <StatusChip source="status" colors={rawInputStatusColors} />
            <DateField source="createdAt" showTime={true} />
            <DateField source="updatedAt" showTime={true} />
        </Datagrid>
    </List>
);

export const InputsShow = () => (
    <Show>
         <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Interaction">
                <TextField source="publicId" />
                <TextField source="data.connectorName" />
                <ReferenceField source="accountId" reference="accounts" label="Account" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <SimpleShowLayout>
                        <TextField source="customer.name" />
                        <TextField source="name"/>
                        <TextField source="publicId"/>
                    </SimpleShowLayout>
                </ReferenceField>
                <LinkedTextField source="digitalInteractionId" targetResource="digital-interactions" />                
                <StatusChip source="status" colors={rawInputStatusColors} />
                <DateField source="createdAt" showTime={true} />
                <DateField source="updatedAt" showTime={true} />
                <CustomActionButton label="Reencaminhar (Cria uma nova Interaction se não existir)" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reprocessar este raw input?") && 
                    rawInputReProcess(record.publicId, false).then((response) => {
                        alert(`Raw Input publicId ${response.publicId} reprocessado com sucesso! Status: ${response.status}`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar raw input: ${error}`);                                
                    });                            
                }}/>
                <CustomActionButton label="Reprocessar (Força a criação de uma nova Interaction)" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reprocessar este raw input, com criação de nova Interaction") && 
                    rawInputReProcess(record.publicId, true).then((response) => {
                        alert(`Raw Input publicId ${response.publicId} reprocessado com sucesso!`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar raw input: ${error}`);                                
                    });                            
                }}/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Raw Input Data">
                <FunctionField
                    source="data"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(maskSensitiveData(record.data), null, 2)}
                        </pre>
                    )}
                />        
                <ReferenceOneField target="digitalInteractionId" reference="outputs" label="RawOutput" queryOptions={{ meta: { extraPath:'digital-interactions'}}}>                
                    <RawOutputButton/>
                    
                </ReferenceOneField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Histórico">
                <ArrayField source="forwardingHistory" >
                    <Datagrid bulkActionButtons={false}>
                        <StatusChip source="status" colors={rawInputHistoryStatusColors} />                        
                        <DateField source="timestamp" showTime={true} />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>            
        </TabbedShowLayout>
    </Show>
);