import { Datagrid, DateField, FunctionField, List, ReferenceField, Show, TabbedShowLayout, TextField, useRecordContext } from "react-admin";
import { findAggregatedSettings } from "../http/settings";
import { maskSensitiveData } from "../common/sensitive";
import { useEffect, useState } from "react";

export const SettingsField = () => {
    const record = useRecordContext();
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (record?.publicId) {
            findAggregatedSettings(record.publicId).then(fetchedSettings => {
                setSettings(fetchedSettings);
                setLoading(false);
            });
        }
    }, [record]);

    if (!record) return null;

    if (loading) {
        return <span>Loading...</span>;
    }

    return (
        <FunctionField
            source="processSettings"
            render={() => (
                <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '500px', overflowY: 'auto' }}>
                    {JSON.stringify(maskSensitiveData(settings), null, 2)}
                </pre>
            )}
        />
    );
};

export const AccountsList = () => (
    <List>
        <Datagrid bulkActionButtons={false}>
            <TextField source="publicId" />
            <TextField source="name" />
            <TextField source="active" />
            <ReferenceField source="customerId" reference="customers" label="Customer">
                    <TextField source="name" />{" / "}<TextField source="publicId"/>
            </ReferenceField>
            <DateField source="createdAt" showTime={true}/>
            <DateField source="updatedAt" showTime={true}/>
        </Datagrid>
    </List>
);

export const AccountsShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Account">
                <TextField source="publicId" />
                <TextField source="name" />
                <TextField source="active" />
                <ReferenceField source="customerId" reference="customers" label="Customer">
                        <TextField source="name" />{" / "}<TextField source="publicId"/>
                </ReferenceField>
                <DateField source="createdAt" showTime={true}/>
                <DateField source="updatedAt" showTime={true}/>
            </TabbedShowLayout.Tab>
        
            <TabbedShowLayout.Tab label="Aggregated Settings">
                <SettingsField />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);