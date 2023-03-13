import {Button} from "@mui/material";
import {RoleIcon} from "../icons/RoleIcon";

interface Props {
    onClick: (role: string, playerId: string) => void,
    role: string;
    playerId: string;
    wanted: boolean;
}

export const RoleButton = ({onClick, role, playerId, wanted}: Props) => {

    return (
        <Button variant="contained"
                sx={{minWidth: "unset", paddingX: "4px"}}
                color={wanted ? "success" : "error"}
                onClick={() => {
                    onClick(role, playerId);
                }}>
            <RoleIcon role={role}/>
        </Button>

    )
}