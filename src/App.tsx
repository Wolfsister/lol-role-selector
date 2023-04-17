import {KeyboardEvent, useEffect, useState} from 'react'
import './App.css'
import {Box, Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography} from "@mui/material";
import {Player} from "./types/Player";
import {PlayerCard} from "./components/PlayerCard";
import {givePlayersRoles} from "./utils/roleCalculator";
import {ROLES} from "./constants/Roles";
import {PRIMARY_COLOR, WHITE_BACKGROUND} from "./constants/style/Colors";
import {PORO_FILE_NAMES} from "./constants/style/Poros";
import {PLAYERS_LOCAL_STORAGE_KEY} from "./constants/LocalStorage";
import {PlayersList} from "./components/PlayersList";

const getAvailablePorosFilenames = () => {
    const playersFromPreviousSession = localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY)!) : [];

    if (playersFromPreviousSession.length === 0) {
        return PORO_FILE_NAMES;
    }

    const takenPoros = playersFromPreviousSession.map((player: Player) => {
        return player.poroFileName;
    })

    const availableNames = PORO_FILE_NAMES.filter((filename) => !takenPoros.includes(filename));

    return availableNames;
}

function App() {


    const [players, setPlayers] = useState<Player[]>(localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY) ? JSON.parse(localStorage.getItem(PLAYERS_LOCAL_STORAGE_KEY)!) : []);
    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [openDialogPlayersRoles, setOpenDialogPlayersRoles] = useState<boolean>(false);
    const [displayPlayersRoles, setDisplayPlayersRoles] = useState<boolean>(false);
    const [availablePoros, setAvailablePoros] = useState<string[]>(getAvailablePorosFilenames());

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
        setDisplayPlayersRoles(false);
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
            id: Date.now().toString(),
            name: newPlayerName,
            acceptedRoles: ROLES,
            givenRole: "",
            poroFileName: selectedPoroFileName,
        }])
        setNewPlayerName('');
    }

    const onCloseDialogPlayersRoles = () => {
        setOpenDialogPlayersRoles(false);
        setDisplayPlayersRoles(true);
    }

    useEffect(() => {
        localStorage.setItem(PLAYERS_LOCAL_STORAGE_KEY, JSON.stringify(players));
    }, [players]);

    return (
        <div className="App">
            <Stack gap={"10px"}>
                <Typography variant="h3" component="h1"
                            sx={{cursor: "default", textAlign: 'center', color: PRIMARY_COLOR, fontSize: {'xs': '1.2rem', 'sm': '1.5rem', 'md': '2rem'}}}>Bienvenue sur votre
                    sélecteur de rôle
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
                    <Button sx={{color: PRIMARY_COLOR}} disabled={players.length >= 5} onClick={() => addPlayer()}>Ajouter
                        un joueur</Button>
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

                <Dialog open={openDialogPlayersRoles} onClose={onCloseDialogPlayersRoles}>
                    <DialogTitle>Composition trouvée !</DialogTitle>
                    <DialogContent>
                        <PlayersList players={players}/>
                    </DialogContent>
                </Dialog>

                {displayPlayersRoles &&
                    <Box sx={{
                        width: "50%",
                        backgroundColor: WHITE_BACKGROUND,
                        margin: "auto",
                        borderRadius: "4px",
                        opacity: "80%"
                    }}>
                        <PlayersList players={players}/>
                    </Box>
                }
            </Stack>
        </div>
    )
}

export default App
