import { Button, ChipField, Link, TextField, useRecordContext } from "react-admin";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export const CustomActionButton = ({ label, onclick }: { label: string, onclick: Function }) => {
    const record = useRecordContext();

    const handleClick = () => {
        // Coloque aqui a sua lógica personalizada
        onclick(record)
    };

    return (
        <Button
            color="primary"
            onClick={handleClick}>
            <PlayArrowIcon /> {label}
        </Button>
    );
};

export const LinkedTextField = ({ source, targetResource }: { source: string; targetResource: string }) => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Link
            to={`/${targetResource}/${record[source]}/show`}
            style={{
                textDecoration: "none",
                color: "blue"
            }}>
            <TextField
                source={source} />
        </Link>
    );
};

export const StatusChip = ({ source, colors }: { source: string, colors: Map<string, string> }) => {
    const record = useRecordContext();
    const colour = record && record[source] ? colors.get(record[source]) : "grey";

    return (
        <ChipField
            source={source}
            sx={{
                backgroundColor: colour,
                color: "white",
            }}
        />
    );
};