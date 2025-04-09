import { ChipField, Datagrid, DateField, List, ReferenceManyField, Show, TabbedShowLayout, TextField } from "react-admin";

export const CustomersList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="name" />
            <TextField source="identification" />            
            <ChipField source="identificationType" />            
            <DateField source="createdAt" showTime={true}/>
            <DateField source="updatedAt" showTime={true}/>
        </Datagrid>
    </List>
);

export const CustomersShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Customer">
                <TextField source="publicId" />
                <TextField source="name" />
                <TextField source="identification" />            
                <ChipField source="identificationType" />            
                <DateField source="createdAt" showTime={true}/>
                <DateField source="updatedAt" showTime={true}/>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Accounts">
                <ReferenceManyField reference="accounts" target="customerPublicId" label="Accounts">
                <Datagrid bulkActionButtons={false}>
                    <TextField source="publicId" />
                    <TextField source="name" />
                    <TextField source="active"/>
                    <DateField source="createdAt" showTime={true}/>
                    <DateField source="updatedAt" showTime={true}/>
                </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);