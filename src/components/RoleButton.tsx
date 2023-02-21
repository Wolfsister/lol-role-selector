import {Button} from "@mui/material";
import {useState} from "react";

interface Props {
    onClick: (role: string, playerId: number) => void,
    role: string;
    wantedRoleButton: boolean; // true if the button is for wanted roles, false if the button is for banned roles
    playerId: number;
}

export const RoleButton = ({onClick, role, wantedRoleButton, playerId}: Props) => {
    const [selected, setSelected] = useState<boolean>(false);

    const color = wantedRoleButton ? (selected ? "success" : "primary") : (selected ? "error" : "primary");

    return (
        <Button variant="contained" color={color} onClick={() => {
            onClick(role, playerId);
            setSelected(!selected);
        }}>{role}</Button>
    )
}