import {Button} from "@mui/material";
import {useState} from "react";

interface Props {
    onClick: (role: string, playerId: number) => void,
    role: string;
    playerId: number;
}

export const RoleButton = ({onClick, role, playerId}: Props) => {
    const [wanted, setWanted] = useState<boolean>(true);

    return (
        <Button variant="contained" color={wanted ? "success" : "error"} onClick={() => {
            onClick(role, playerId);
            setWanted(!wanted);
        }}>{role}</Button>
    )
}