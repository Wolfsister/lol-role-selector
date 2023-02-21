import {Player} from "../types/Player";
import {Card, CardContent, Typography} from "@mui/material";
import {RoleButton} from "./RoleButton";

interface Props {
    player: Player,
    onClickWantedRole: (role: string, playerId: number) => void,
    onClickBannedRole: (role: string, playerId: number) => void,
}

const ROLES = [
    'top',
    'jungle',
    'middle',
    'adc',
    'support',
];

const ROLES_AND_FILL = [
    ...ROLES,
    'fill'
]

export const PlayerCard = ({player, onClickWantedRole, onClickBannedRole}: Props): JSX.Element => {
    return (

        <Card>
            <CardContent>
                <Typography>{player.id}</Typography>
                <Typography>{player.name}</Typography>
                <Typography>Rôles acceptables</Typography>
                {ROLES_AND_FILL.map((role) => (
                    <RoleButton onClick={onClickWantedRole} role={role} wantedRoleButton={true} key={role} playerId={player.id}/>
                ))}
                {/* TODO: add fill button */}
                {/*<Typography>{player.wantedRoles}</Typography>*/}
                <Typography>Rôles non-acceptables</Typography>
                {ROLES.map((role) => (
                    <RoleButton onClick={onClickBannedRole} role={role} wantedRoleButton={false} key={role} playerId={player.id}/>
                ))}
                {/*<Typography>{player.unwantedRoles}</Typography>*/}

            </CardContent>
        </Card>
    )
}