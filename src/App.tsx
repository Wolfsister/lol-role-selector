import {useState, KeyboardEvent} from 'react'
import './App.css'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle, Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Player} from "./types/Player";
import {PlayerCard} from "./components/PlayerCard";
import {givePlayersRoles} from "./utils/roleCalculator";
import {ROLES} from "./constants/Roles";
import {RoleIcon} from "./icons/RoleIcon";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [openDialogPlayersRoles, setOpenDialogPlayersRoles] = useState<boolean>(false);

    const onKeyDownInputAddPlayer = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addPlayer();
        }
    }

    const onClickRole = (clickedRole: string, playerId: string) => {
        const updatedPlayers = players.map((player) => {
            if (player.id === playerId) {
                const updatedAcceptedRoles = player.acceptedRoles.includes(clickedRole) ? player.acceptedRoles.filter((acceptedRole) => acceptedRole !== clickedRole) : [...player.acceptedRoles, clickedRole];
                return {...player, acceptedRoles: updatedAcceptedRoles};
            }
            return player;
        })
        setPlayers(updatedPlayers);
    }

    const onClearPlayer = (playerId: string) => {

        const updatedPlayers = players.filter((player) => {
            return player.id !== playerId;
        })
        setPlayers(updatedPlayers);
    }

    const onClickRoleCalculator = () => {
        const playersWithRoles = givePlayersRoles(players);
        if (playersWithRoles) {
            setPlayers(playersWithRoles)
            setOpenDialogPlayersRoles(true);
        }
    }

    const addPlayer = () => {
        if (newPlayerName.length === 0) {
            alert('Merci de choisir un nom au préalable.');
            return;
        }

        if (players.length >= 5) {
            alert('Vous avez atteint le nombre maximum de joueurs.');
            return;
        }

        setPlayers([...players, {
            id:  Date.now().toString(),
            name: newPlayerName,
            acceptedRoles: ROLES,
            givenRole: "",
            randomHash: Math.floor(Math.random() * 2000),
        }])
        setNewPlayerName('');
    }

    return (
        <div className="App">
            <Stack gap={"10px"}>
                <Typography variant="h2" component="h1" sx={{textAlign: 'center'}}>Bienvenue sur votre sélecteur de rôle
                    préféré !</Typography>
                <Typography variant="h3" sx={{fontSize: 'medium', textAlign: 'center'}}> (l'unique ? j'ai pas
                    cherché)</Typography>
                <Stack alignSelf={"center"} flexDirection={"row"} gap={2}>
                    <TextField
                        id="outlined-controlled"
                        label="Nom du nouveau joueur"
                        value={newPlayerName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPlayerName(event.target.value);
                        }}
                        onKeyDown={onKeyDownInputAddPlayer}
                    />
                    <Button disabled={players.length >= 5} onClick={() => addPlayer()}>Ajouter un joueur</Button>
                </Stack>
                <Stack gap={2} justifyContent={"center"} width={"100vw"} flexWrap={"wrap"} alignSelf={"center"}
                       flexDirection={"row"}>
                    {players.map((player) => (
                        <PlayerCard onClickRole={onClickRole} onClearPlayer={onClearPlayer} player={player}
                                    key={player.id}/>
                    ))}
                </Stack>
                {players.length > 0 &&
                    <Button sx={{width: "fit-content", alignSelf: "center"}} variant="contained"
                            disabled={players.length === 0} onClick={onClickRoleCalculator}>Choisir les
                        rôles</Button>
                }

                <Dialog open={openDialogPlayersRoles} onClose={() => setOpenDialogPlayersRoles(false)}>
                    <DialogTitle>Composition trouvée !</DialogTitle>
                    <DialogContent>
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
                        </List>
                    </DialogContent>
                </Dialog>
            </Stack>
        </div>
    )
}

export default App
