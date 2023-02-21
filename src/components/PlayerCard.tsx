import {Player} from "../types/Player";
import {Card, CardContent, Typography} from "@mui/material";
import {RoleButton} from "./RoleButton";
import {ROLES} from "../constants/Roles";

interface Props {
    player: Player,
    onClickRole: (role: string, playerId: number) => void}

export const PlayerCard = ({player, onClickRole}: Props): JSX.Element => {
    return (

        <Card>
            <CardContent>
                <Typography>{player.id}</Typography>
                <Typography>{player.name}</Typography>
                <Typography>Rôles</Typography>
                {ROLES.map((role) => (
                    <RoleButton onClick={onClickRole} role={role} key={role} playerId={player.id}/>
                ))}

            </CardContent>
        </Card>
    )
}