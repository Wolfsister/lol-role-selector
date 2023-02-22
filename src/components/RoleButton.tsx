import {Button} from "@mui/material";
import {useState} from "react";
import {RoleIcon} from "../icons/RoleIcon";

interface Props {
    onClick: (role: string, playerId: number) => void,
    role: string;
    playerId: number;
}

export const RoleButton = ({onClick, role, playerId}: Props) => {
    const [wanted, setWanted] = useState<boolean>(true);

    return (
        <Button variant="contained"
                sx={{minWidth: "unset", paddingX: "4px"}}
                color={wanted ? "success" : "error"}
                onClick={() => {
                    onClick(role, playerId);
                    setWanted(!wanted);
                }}>
            <RoleIcon role={role}/>
        </Button>

    )
}