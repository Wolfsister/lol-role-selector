import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {RoleIcon} from "../icons/RoleIcon";
import {Player} from "../types/Player";
import { PRIMARY_COLOR } from "../constants/style/Colors";

interface Props {
    players: Player[], 
}

export const PlayersList = ({players}: Props) =>
    {
return (
        <List>
            {players.map((player, index) => (
                <div key={player.id}>
                    <ListItem>
                        <ListItemIcon>
                            <RoleIcon role={player.givenRole}/>
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{style: {color: PRIMARY_COLOR}}}
                            secondary={player.givenRole.toUpperCase()}
                        >
                            {player.name}
                        </ListItemText>
                    </ListItem>
                    {index !== players.length - 1 && <Divider variant="middle"/>}
                </div>
            ))}
        </List>)
    }
