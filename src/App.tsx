import {useState} from 'react'
import './App.css'
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Player} from "./types/Player";
import {PlayerCard} from "./components/PlayerCard";
import {givePlayersRoles} from "./utils/roleCalculator";
import {ROLES} from "./constants/Roles";

function App() {
    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [openDialogPlayersRoles, setOpenDialogPlayersRoles] = useState<boolean>(false);

    const onClickRole = (clickedRole: string, playerId: number) => {
        const updatedPlayers = players.map((player) => {
            if (player.id === playerId) {
                const updatedAcceptedRoles = player.acceptedRoles.includes(clickedRole) ? player.acceptedRoles.filter((acceptedRole) => acceptedRole !== clickedRole) : [...player.acceptedRoles, clickedRole];
                return {...player, acceptedRoles: updatedAcceptedRoles};
            }
            return player;
        })
        setPlayers(updatedPlayers);
    }

    const onClearPlayer = (playerId: number) => {

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
        setPlayers([...players, {
            id: players.length + 1,
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
            <Stack alignSelf={"center"} flexDirection={"row"} gap={2}><TextField
                id="outlined-controlled"
                label="Nom du nouveau joueur"
                value={newPlayerName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNewPlayerName(event.target.value);
                }}
            />
            <Button disabled={players.length === 5} onClick={() => addPlayer()}>Ajouter un joueur</Button>
            </Stack>
            <Stack gap={2} alignSelf={"center"} flexDirection={{xs: "column", md: "row"}}>
                {players.map((player) => (
                    <PlayerCard onClickRole={onClickRole} onClearPlayer={onClearPlayer} player={player}
                                key={player.id}/>
                ))}
            </Stack>
            {players.length > 0 &&
                <Button sx={{width: "fit-content", alignSelf: "center"}} variant="contained" disabled={players.length === 0} onClick={onClickRoleCalculator}>Choisir les
                    rôles</Button>
            }

            <Dialog open={openDialogPlayersRoles} onClose={() => setOpenDialogPlayersRoles(false)}>
                <DialogTitle>Composition trouvée !</DialogTitle>
                <DialogContent>
                    <List>
                        {players.map((player) => (
                            <ListItem key={player.id}>
                                <ListItemText secondary={player.givenRole}>{player.name}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
            </Stack>
        </div>
    )
}

export default App
