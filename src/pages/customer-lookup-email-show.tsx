import {
    TabbedShowLayout,
    Translate,
    FunctionField,
    TextField,
    SimpleShowLayout,
    Title,
    useTranslate
} from "react-admin";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const CustomerLookupEmailShow = () => {
    const location = useLocation();
    const translate = useTranslate();

    const customerEmailData = location.state?.customerEmailData || null;

    if (!customerEmailData) {
        return <div><Translate
            i18nKey="global.loading" /></div>;
    }

    return (
        <Box>
            <Title
                title="customers.lookup.emailTitle" />
            <TabbedShowLayout
                record={customerEmailData}
                syncWithLocation={false}>
                <TabbedShowLayout.Tab
                    label="customers.lookup.tab.customer">
                    {!customerEmailData.customer ? (
                        <Typography
                            gutterBottom
                            color="textSecondary"
                            variant="body2">
                            <Translate
                                i18nKey="customers.lookup.customer.notFound" />
                        </Typography>
                    ) : (
                        <SimpleShowLayout>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.status" />
                            </Typography>
                            <FunctionField
                                render={(record: { customer: { status: string } }) => {
                                    return <Translate
                                        i18nKey={`customers.lookup.customer.statusOptions.${record.customer.status}`}>
                                        {record.customer.status}
                                    </Translate>
                                }}
                            />
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 2,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="customers.lookup.customer.title" />
                            </Typography>
                            <TextField
                                label="global.domain"
                                source="customer.domain" />
                            <TextField
                                label="global.email"
                                source="customer.userEmail" />
                            <TextField
                                label="global.organizationUuid"
                                source="customer.organizationUuid" />
                            <TextField
                                label="global.organizationId"
                                source="customer.organizationId" />
                            <FunctionField
                                label="global.cpfCnpj"
                                render={(record: { customer: { cpfCnpj: string } }) => record.customer.cpfCnpj ? record.customer.cpfCnpj : translate("customers.lookup.customer.cpfCnpj.notFound")}
                                source="customer.cpfCnpj" />
                            <FunctionField
                                label="customers.lookup.customer.receivedBonusCredit"
                                render={(record: { customer: { receivedBonusCredit: string } }) => record.customer.receivedBonusCredit === "true" ? "Sim" : "Não"}
                                source="customer.receivedBonusCredit"
                            />
                            <FunctionField
                                label="customers.lookup.customer.needPrepaymentInvoice"
                                render={(record: { customer: { needPrepaymentInvoice: string } }) => record.customer.needPrepaymentInvoice === "true" ? "Sim" : "Não"}
                                source="customer.needPrepaymentInvoice"
                            />
                            <FunctionField
                                label="global.financialMails"
                                source="customer.financialMails"
                                render={(record: { customer: { financialMails: string } }) => {
                                    return record.customer.financialMails
                                        ? record.customer.financialMails
                                        : translate("customers.lookup.customer.financialMails.notFound");
                                }} />
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="customers.lookup.customer.relatedOrganizations.name" />
                            </Typography>
                            {customerEmailData.customer?.relatedOrganizations?.length > 0 ? (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "1fr",
                                            sm: "repeat(2, 1fr)",
                                            md: "repeat(3, 1fr))"
                                        },
                                        gap: 2
                                    }}>
                                    {customerEmailData.customer.relatedOrganizations.map((org: {
                                        id: string;
                                        domain: string;
                                        name: string;
                                        email: string;
                                        phone: string;
                                        is_unlimited: boolean;
                                        created_at: string;
                                    }) => (
                                        <Paper
                                            key={org.id}
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: 1,
                                                bgcolor: "background.default"
                                            }}>
                                            <Stack
                                                spacing={1}>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.id" />:&nbsp;
                                                    </strong>
                                                    {org.id}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.domain" />:&nbsp;
                                                    </strong>
                                                    {org.domain}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.name" />:&nbsp;
                                                    </strong>
                                                    {org.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.email" />:&nbsp;
                                                    </strong>
                                                    {org.email}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.phone" />:&nbsp;
                                                    </strong>
                                                    {org.phone}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="customers.lookup.customer.isUnlimited" />:&nbsp;
                                                    </strong>
                                                    {org.is_unlimited ? translate("global.yes") : translate("global.no")}
                                                </Typography>
                                                <Typography
                                                    variant="body2">
                                                    <strong>
                                                        <Translate
                                                            i18nKey="global.createdAt" />:&nbsp;
                                                    </strong>
                                                    {new Date(org.created_at).toLocaleDateString("pt-BR", {
                                                        year: "numeric",
                                                        month: "2-digit",
                                                        day: "2-digit"
                                                    })}
                                                </Typography>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Box>
                            ) : (
                                <Typography
                                    color="textSecondary"
                                    variant="body2">
                                    <Translate
                                        i18nKey="customers.lookup.customer.relatedOrganizations.notFound" />
                                </Typography>
                            )}
                        </SimpleShowLayout>
                    )}
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab
                    label="customers.lookup.tab.omie">
                    {!customerEmailData.omie ? (
                        <Typography
                            gutterBottom
                            color="textSecondary"
                            variant="body2">
                            <Translate
                                i18nKey="customers.lookup.omie.notFound" />
                        </Typography>
                    ) : (
                        <SimpleShowLayout>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.status" />
                            </Typography>
                            <FunctionField
                                label="global.situation"
                                render={(record: { omie: { inactive: boolean } }) =>
                                    record.omie.inactive ? translate("global.inactive") : translate("global.active")
                                }
                            />

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 2,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.registrationData" />
                            </Typography>
                            <TextField
                                label="customers.lookup.omie.id"
                                source="omie.id" />
                            <TextField
                                label="global.externalReference"
                                source="omie.externalReference" />
                            <TextField
                                label="global.legalName"
                                source="omie.name" />
                            <TextField
                                label="global.fantasyName"
                                source="omie.fantasyName" />
                            <TextField
                                label="global.email"
                                source="omie.email" />
                            <TextField
                                label="global.cpfCnpj"
                                source="omie.cpfCnpj" />
                            <TextField
                                label="customers.lookup.omie.phone1"
                                source="omie.phone1" />
                            <TextField
                                label="customers.lookup.omie.phone2"
                                source="omie.phone2" />

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.address.title" />
                            </Typography>
                            <TextField
                                label="global.address.street"
                                source="omie.address" />
                            <TextField
                                label="global.address.number"
                                source="omie.number" />
                            <TextField
                                label="global.address.complement"
                                source="omie.complement" />
                            <TextField
                                label="global.address.neighborhood"
                                source="omie.neighborhood" />
                            <TextField
                                label="global.address.city"
                                source="omie.city" />
                            <TextField
                                label="global.address.state"
                                source="omie.state" />
                            <TextField
                                label="global.address.postalCode"
                                source="omie.postalCode" />
                            <TextField
                                label="global.address.country"
                                source="omie.country" />
                        </SimpleShowLayout>
                    )}
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab
                    label="customers.lookup.tab.asaas">
                    {!customerEmailData.asaas ? (
                        <Typography
                            gutterBottom
                            color="textSecondary"
                            variant="body2">
                            <Translate
                                i18nKey="customers.lookup.asaas.notFound" />
                        </Typography>
                    ) : (
                        <SimpleShowLayout>
                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.status" />
                            </Typography>
                            <FunctionField
                                label="global.situation"
                                render={(record: { asaas: { deleted: boolean } }) =>
                                    record.asaas.deleted ? translate("global.excluded") : translate("global.active")
                                }
                            />

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 2,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.registrationData" />
                            </Typography>
                            <TextField
                                label="customers.lookup.asaas.id"
                                source="asaas.id" />
                            <TextField
                                label="global.externalReference"
                                source="asaas.externalReference" />
                            <TextField
                                label="global.name"
                                source="asaas.name" />
                            <TextField
                                label="global.email"
                                source="asaas.email" />
                            <TextField
                                label="global.company"
                                source="asaas.company" />
                            <FunctionField
                                label="global.personType"
                                render={(record: { asaas: { personType: string } }) =>
                                    record.asaas.personType === "FISICA" ? translate("global.naturalPerson") : translate("global.legalPerson")
                                }
                            />
                            <TextField
                                label="global.cpfCnpj"
                                source="asaas.cpfCnpj" />
                            <TextField
                                label="global.observations"
                                source="asaas.observations" />

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.contacts" />
                            </Typography>
                            <FunctionField
                                label="global.fixedPhone"
                                render={(record: { asaas: { phone: string } }) =>
                                    record.asaas.phone ? `(${record.asaas.phone.substring(0, 2)}) ${record.asaas.phone.substring(2)}` : translate("global.notInformed")
                                }
                            />
                            <FunctionField
                                label="global.mobilePhone"
                                render={(record: { asaas: { mobilePhone: string } }) =>
                                    record.asaas.mobilePhone ? `(${record.asaas.mobilePhone.substring(0, 2)}) ${record.asaas.mobilePhone.substring(2)}` : translate("global.notInformed")
                                }
                            />

                            <Typography
                                gutterBottom
                                variant="h6"
                                sx={{
                                    mt: 3,
                                    fontWeight: "bold"
                                }}>
                                <Translate
                                    i18nKey="global.address.title" />
                            </Typography>

                            <TextField
                                label="global.address.street"
                                source="asaas.address" />
                            <TextField
                                label="global.address.number"
                                source="asaas.number" />
                            <TextField
                                label="global.address.complement"
                                source="asaas.complement" />
                            <TextField
                                label="global.address.neighborhood"
                                source="asaas.neighborhood" />
                            <TextField
                                label="global.address.postalCode"
                                source="asaas.postalCode" />
                            <TextField
                                label="global.address.city"
                                source="asaas.city" />
                            <TextField
                                label="global.address.state"
                                source="asaas.state" />
                            <TextField
                                label="global.address.country"
                                source="asaas.country" />
                        </SimpleShowLayout>
                    )}
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Box>
    );
};

export default CustomerLookupEmailShow;