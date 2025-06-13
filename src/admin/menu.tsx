import { Menu, useTranslate } from "react-admin";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const AdminMenu = () => {
    const translate = useTranslate();
    return (
        <Menu>
            <Menu.Item
                leftIcon={<PeopleAltIcon />}
                primaryText={translate("customers.lookup.title")}
                to="/customers/lookup" />
            <Menu.Item
                leftIcon={<ContentPasteSearchIcon />}
                primaryText={translate("documentLookup.title")}
                to="/documents/lookup" />
        </Menu>
    )
};
