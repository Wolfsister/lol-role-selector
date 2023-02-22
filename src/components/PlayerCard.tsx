import {Player} from "../types/Player";
import {Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography} from "@mui/material";
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
        <Card sx={{width: {md: "250px"}}}>
            <CardHeader title={player.name}
                        action={<IconButton onClick={() => onClearPlayer(player.id)} aria-label="delete">
                            <ClearIcon/>
                        </IconButton>}>
            </CardHeader>
            <CardMedia
                component="img"
                height="194"
                width="194"
                image={`https://robohash.org/${player.id}${player.name}${player.randomHash}`}
                alt="Paella dish"
            />
            <CardContent>
                <Typography>Rôles</Typography>
                <Stack justifyContent={"center"} flexDirection={"row"} gap={1}>
                    {ROLES.map((role) => (
                        <RoleButton onClick={onClickRole} role={role} key={role} playerId={player.id}/>
                    ))}
                </Stack>

            </CardContent>
        </Card>
    )
}