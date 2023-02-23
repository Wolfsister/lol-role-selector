import {Player} from "../types/Player";
import {Card, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {RoleButton} from "./RoleButton";
import {ROLES} from "../constants/Roles";
import {PLAYER_CARD_BACKGROUND_COLOR, PLAYER_CARD_TITLE_COLOR, PRIMARY_COLOR} from "../constants/style/Colors";

interface Props {
    player: Player,
    onClickRole: (role: string, playerId: string) => void,
    onClearPlayer: (playerId: string) => void,
}

export const PlayerCard = ({player, onClickRole, onClearPlayer}: Props): JSX.Element => {
    return (
        <Card sx={{width: {md: "250px"}, backgroundColor: PLAYER_CARD_BACKGROUND_COLOR}}>
            <CardHeader title={player.name}
                        sx={{color: PLAYER_CARD_TITLE_COLOR, cursor: "default"}}
                        action={<IconButton onClick={() => onClearPlayer(player.id)} aria-label="delete">
                            <ClearIcon/>
                        </IconButton>}>
            </CardHeader>
            <CardMedia
                component="img"
                height="194"
                width="194"
                image={`/poros/${player.poroFileName}`}
                alt="Paella dish"
            />
            <CardContent>
                <Stack justifyContent={"center"} flexDirection={"row"} gap={1}>
                    {ROLES.map((role) => (
                        <RoleButton onClick={onClickRole} role={role} key={role} playerId={player.id}/>
                    ))}
                </Stack>

            </CardContent>
        </Card>
    )
}