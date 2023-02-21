import {Player} from "../types/Player";
import {Card, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {RoleButton} from "./RoleButton";
import {ROLES} from "../constants/Roles";

interface Props {
    player: Player,
    onClickRole: (role: string, playerId: number) => void,
    onClearPlayer: (playerId: number) => void,
}

export const PlayerCard = ({player, onClickRole, onClearPlayer}: Props): JSX.Element => {
    return (
        <Card>
            <CardHeader title={player.name} action={<IconButton onClick={() => onClearPlayer(player.id)} aria-label="delete">
                    <ClearIcon />
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Typography>Rôles</Typography>
                {ROLES.map((role) => (
                    <RoleButton onClick={onClickRole} role={role} key={role} playerId={player.id}/>
                ))}

            </CardContent>
        </Card>
    )
}