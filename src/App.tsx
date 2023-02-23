import {useState, useEffect, KeyboardEvent} from 'react'
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
import {PRIMARY_COLOR} from "./constants/style/Colors";
import {PORO_FILE_NAMES} from "./constants/style/Poros";
import {PLAYERS_LOCAL_STORAGE_KEY} from "./constants/LocalStorage";

function App() {
    const [players, setPlayers] = useState<Player[]>(localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY)!) : []);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [openDialogPlayersRoles, setOpenDialogPlayersRoles] = useState<boolean>(false);
    const [availablePoros, setAvailablePoros] = useState<string[]>(PORO_FILE_NAMES);

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

        const player = players.find((player) => player.id === playerId);
        if (player) {

            setAvailablePoros([...availablePoros, player.poroFileName]);

            const updatedPlayers = players.filter((player) => {
                return player.id !== playerId;
            })
            setPlayers(updatedPlayers);
        }

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

        const selectedPoroFileName = availablePoros[Math.floor(Math.random() * availablePoros.length)];
        setAvailablePoros(availablePoros.filter((poroFileName) => poroFileName !== selectedPoroFileName));

        setPlayers([...players, {
            id:  Date.now().toString(),
            name: newPlayerName,
            acceptedRoles: ROLES,
            givenRole: "",
            poroFileName: selectedPoroFileName,
        }])
        setNewPlayerName('');
    }

    useEffect(() => {
        localStorage.setItem(PLAYERS_LOCAL_STORAGE_KEY, JSON.stringify(players));
    }, [players]);

    return (
        <div className="App">
            <Stack gap={"10px"}>
                <Typography variant="h3" component="h1" sx={{cursor: "default", textAlign: 'center', color: PRIMARY_COLOR}}>Bienvenue sur votre sélecteur de rôle
                    préféré !</Typography>
                <Stack alignSelf={"center"} flexDirection={"row"} gap={2}>
                    <TextField
                        sx={{  // input label when focused
                            "& label.Mui-focused": {
                                color: PRIMARY_COLOR
                            },
                            // focused color for input with variant='standard'
                            "& .MuiInput-underline:after": {
                                borderBottomColor: PRIMARY_COLOR
                            },
                            // focused color for input with variant='filled'
                            "& .MuiFilledInput-underline:after": {
                                borderBottomColor: PRIMARY_COLOR
                            },
                            // focused color for input with variant='outlined'
                            "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: PRIMARY_COLOR
                                }
                            }
                            }}
                        id="outlined-controlled"
                        label="Nom du nouveau joueur"
                        value={newPlayerName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setNewPlayerName(event.target.value);
                        }}
                        onKeyDown={onKeyDownInputAddPlayer}
                    />
                    <Button sx={{color: PRIMARY_COLOR}} disabled={players.length >= 5} onClick={() => addPlayer()}>Ajouter un joueur</Button>
                </Stack>
                <Stack gap={2} justifyContent={"center"} width={"100vw"} flexWrap={"wrap"} alignSelf={"center"}
                       flexDirection={"row"}>
                    {players.map((player) => (
                        <PlayerCard onClickRole={onClickRole} onClearPlayer={onClearPlayer} player={player}
                                    key={player.id}/>
                    ))}
                </Stack>
                {players.length > 0 &&
                    <Button sx={{width: "fit-content", alignSelf: "center", backgroundColor: PRIMARY_COLOR}}
                            variant="contained"
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
