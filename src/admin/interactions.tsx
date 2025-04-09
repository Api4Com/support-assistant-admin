import { ArrayField, Button, ChipField, Datagrid, DateField, FunctionField, Identifier, List, RaRecord, ReferenceField, Show, SimpleShowLayout, TabbedShowLayout, TextField, UrlField, useRecordContext, useRedirect } from "react-admin";
import { activityRePublish } from "../http/reprocess";
import { maskSensitiveData } from "../common/sensitive";
import { CustomActionButton, StatusChip } from "../common/ui-components";

const interationStatusColors = new Map<string, string>([
    ['CREATED', 'blue'],
    ['PROCESSING', 'orange'],
    ['DONE', 'green'],
]);

const workflowStatusColors = new Map<string, string>([
    ['AWAIT', 'gray'],
    ['PENDING', 'orange'],
    ['UNPROCESSABLE', 'black'],
    ['FAILED', 'red'],
    ['DONE', 'green'],
]);

const activityTypeColors = new Map<string, string>([
    ['REGISTERED', 'blue'],
    ['PROCESSED', 'MediumSeaGreen'],
    ['UNPROCESSABLE_CONTENT', 'black'],
    ['COMPLETED', 'green'],
    ['FAILED', 'red'],
]);

const processors = new Map<string, string>([
    ['transcription', 'transcriptions'],
    ['summary-manager-notes', 'summaries'],
    ['summary-sale-methodology', 'summaries'],
    ['summary-score-criteria', 'summaries'],
]);

const formatOutputMediaType = (record: any) => {
    const output = record.outputs[0];
    if (output) {
        return `${output.mediaType}/${output.format}`;
    }
    return '';
}

const DetailActivityButton = ( {interaction, source} : { interaction?: { activities?: any[] } | RaRecord<Identifier>, source: string } ) => {
    const redirect = useRedirect();
    const record = useRecordContext();
    let activity = record;
    let processorName = record?.processor?.name ?? '';
    
    if (interaction !== undefined) {
        activity = interaction.activities.filter((activity: any) => activity.processor?.name === record?.name)[0];
        processorName = record?.name ?? '';
    }

    if (!activity || activity.processor === null) {
        return null;
    }
    
    return (
        <Button
            onClick={() => redirect(`/${processors.get(processorName)}/${activity.outputs[0].externalId}/show`)}
            variant="outlined" color="primary" size="small">
            {source}
        </Button>
    );
};

const WorkFlowGrid = () => {
    const record = useRecordContext();
    
    return (
        <ArrayField source="processWorkflow.data.processors" >
            <Datagrid bulkActionButtons={false} rowClick={false}>
                <TextField source="name"/>
                <StatusChip source="status" colors={workflowStatusColors} />
                <DetailActivityButton interaction={record} source="Detalhes"/>                
            </Datagrid>
        </ArrayField>
    );
}

export const InterationsList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="connectorName" />            
            <ReferenceField source="accountId" reference="accounts" label="Customer / Account PublicId" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <TextField source="customer.name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <StatusChip source="status" colors={interationStatusColors} />
            <DateField source="createdAt" showTime={true}/>
            <DateField source="updatedAt" showTime={true}/>
        </Datagrid>
    </List>
);

export const InterationsShow = () => (
    <Show queryOptions={{meta: { queryParams: {includeActivities: true}}}}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Interaction">
                <TextField source="publicId" />
                <TextField source="connectorName" />
                <ReferenceField source="accountId" reference="accounts" label="Account" queryOptions={{meta: { queryParams: {includeCustomer: true}}}}>
                    <SimpleShowLayout>
                        <TextField source="customer.name" />
                        <TextField source="name"/>
                        <TextField source="publicId"/>
                    </SimpleShowLayout>
                </ReferenceField>
                <TextField source="userId" />
                <TextField source="setupName" />
                <DateField source="createdAt" showTime={true} />
                <DateField source="updatedAt" showTime={true} />
                <StatusChip source="status" colors={interationStatusColors} />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Settings">
                <FunctionField
                    source="processSettings"
                    render={(record) => (
                        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                            {JSON.stringify(maskSensitiveData(record.processSettings.data), null, 2)}
                        </pre>
                    )}
                />                
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Inputs">
                <ArrayField source="inputs" >
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <ChipField source="mediaType"/>
                        <ChipField source="format"/>
                        <TextField source="content"/>
                        <TextField source="contentRef"/>
                        <UrlField source="contentRef" content="Acessar conteúdo"/>
                    </Datagrid>
                </ArrayField>
            </TabbedShowLayout.Tab>            
            <TabbedShowLayout.Tab label="WorkFlow">
                <WorkFlowGrid/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Activities">
                <ArrayField source="activities" >
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                        <TextField source="publicId"/>
                        <TextField source="processor.name" />
                        <FunctionField
                            label="Output"
                            render={record => formatOutputMediaType(record)}
                        />                                                
                        <StatusChip source="activityType" colors={activityTypeColors} />
                        <DateField source="createdAt" showTime={true} />
                        <DateField source="updatedAt" showTime={true} />
                        <DetailActivityButton source="Detalhes"/>
                        <CustomActionButton label="Republicar" onclick={(record: any) => {
                            confirm("Tem certeza que deseja republicar esta activity?") && 
                            activityRePublish(record.publicId).then((response) => {
                                alert(`Activity publicId ${response.publicId} e type ${response.activityType} republicada com sucesso!`);
                                
                            }).catch((error) => {
                                alert(`Error republicar activity: ${error}`);                                
                            });                            
                        }}/>
                    </Datagrid>
                </ArrayField>                
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);