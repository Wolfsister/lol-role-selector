import { useState } from 'react'
import reactLogo from './assets/react.svg'
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
      }])
      setNewPlayerName('');
  }

  return (
    <div className="App">
        <Typography variant="h2" component="h1" sx={{textAlign: 'center'}}>Bienvenue sur votre sélecteur de rôle préféré !</Typography>
        <Typography variant="h3" sx={{fontSize: 'medium', textAlign: 'center'}}> (l'unique ? j'ai pas cherché)</Typography>
        <TextField
            id="outlined-controlled"
            label="Nom du nouveau joueur"
            value={newPlayerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setNewPlayerName(event.target.value);
            }}
        />
        <Button onClick={() => addPlayer()}>Ajouter un joueur</Button>
        <Stack flexDirection={"row"}>
            {players.map((player) => (
                <PlayerCard onClickRole={onClickRole} player={player} key={player.id}/>
            ))}
        </Stack>
        <Button variant="contained" disabled={players.length === 0} onClick={onClickRoleCalculator}>Choisir les rôles</Button>

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

    </div>
  )
}

export default App
