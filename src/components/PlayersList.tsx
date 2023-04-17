import {Divider, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import {RoleIcon} from "../icons/RoleIcon";
import {Player} from "../types/Player";


export const PlayersList = ({players}: { players: Player[] }) =>
    (
        <List>
            {players.map((player, index) => (
                <div key={player.id}>
                    <ListItem>
                        <ListItemIcon>
                            <RoleIcon role={player.givenRole}/>
                        </ListItemIcon>
                        <ListItemText
                            secondary={player.givenRole.toUpperCase()}>{player.name}</ListItemText>
                    </ListItem>
                    {index !== players.length - 1 && <Divider variant="middle"/>}
                </div>
            ))}
        </List>)
