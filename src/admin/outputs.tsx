import { ArrayField, Datagrid, DateField, FunctionField, List, ReferenceField, Show, SimpleShowLayout, TabbedShowLayout, TextField } from "react-admin";
import { maskSensitiveData } from "../common/sensitive";
import { CustomActionButton, LinkedTextField, StatusChip } from "../common/ui-components";
import { rawOutputReForward, rawOutputReProcess } from "../http/reprocess";

const rawOutputStatusColors = new Map<string, string>([
    ['RECEIVED', 'blue'],
    ['CONVERTED', 'MediumSeaGreen'],
    ['FORWARDED', 'green'],
    ['FORWARDING_ERROR', 'red'],
]);

const rawOutputHistoryStatusColors = new Map<string, string>([
    ['SUCCESS', 'green'],
    ['ERROR', 'red'],
]);

export const OutputsList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="data.connectorName" />
            <ReferenceField source="data.accountId" reference="accounts" label="Customer / Account PublicId" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <TextField source="customer.name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <TextField source="data.digitalInteractionId" />
            <StatusChip source="status" colors={rawOutputStatusColors} />
            <DateField source="createdAt" showTime={true} />
            <DateField source="updatedAt" showTime={true} />
        </Datagrid>
    </List>
);

export const OutputsShow = () => (
    <Show>
         <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Interaction">
                <TextField source="publicId"/>
                <TextField source="data.connectorName" />
                <ReferenceField source="accountId" reference="accounts" label="Account" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <SimpleShowLayout>
                        <TextField source="customer.name" />
                        <TextField source="name"/>
                        <TextField source="publicId"/>
                    </SimpleShowLayout>
                </ReferenceField>
                <LinkedTextField source="data.digitalInteractionId" targetResource="digital-interactions" />                
                <StatusChip source="status" colors={rawOutputStatusColors} />
                <DateField source="createdAt" showTime={true} />
                <DateField source="updatedAt" showTime={true} />
                <CustomActionButton label="Reprocessar" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reprocessar este raw output?") && 
                    rawOutputReProcess(record.publicId).then((response) => {
                        alert(`Raw Output publicId ${response.publicId} reprocessado com sucesso! Status: ${response.status}`);
                        
                    }).catch((error) => {
                        alert(`Error reprocessar raw output: ${error}`);                                
                    });                            
                }}/>
                <CustomActionButton label="Reencaminhar" onclick={(record: any) => {
                    confirm("Tem certeza que deseja reencaminhar este raw output") && 
                    rawOutputReForward(record.publicId).then((response) => {
                        alert(`Raw Output publicId ${response.publicId} reencaminhado com sucesso!`);
                        
                    }).catch((error) => {
                        alert(`Error reencaminhar raw output: ${error}`);                                
                    });                            
                }}/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Raw Output Data">
                <FunctionField
                    source="data"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(maskSensitiveData(record.data), null, 2)}
                        </pre>
                    )}
                />                
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Histórico">
                <ArrayField source="forwardingHistory" >
                    <Datagrid bulkActionButtons={false}>
                        <StatusChip source="status" colors={rawOutputHistoryStatusColors} /> 
                        <DateField source="timestamp" showTime={true} />
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);