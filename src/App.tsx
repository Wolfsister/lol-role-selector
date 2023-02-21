import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Button, Stack, TextField, Typography} from "@mui/material";
import {Player} from "./types/Player";
import {PlayerCard} from "./components/PlayerCard";

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const onClickWantedRole = (role: string, playerId: number) => {
      const updatedPlayers = players.map((player) => {
          if (player.id === playerId) {
              const updatedWantedRoles = player.wantedRoles.includes(role) ? player.wantedRoles.filter((wantedRole) => wantedRole !== role) : [...player.wantedRoles, role];
              return {...player, wantedRoles: updatedWantedRoles};
          }
          return player;
      })
      setPlayers(updatedPlayers);
  }

  const onClickBannedRole = (role: string, playerId: number) => {
      const updatedPlayers = players.map((player) => {
          if (player.id === playerId) {
              const updatedUnwantedRoles = player.unwantedRoles.includes(role) ? player.unwantedRoles.filter((unwantedRole) => unwantedRole !== role) : [...player.unwantedRoles, role];
              return {...player, unwantedRoles: updatedUnwantedRoles};
          }
          return player;
      })
      setPlayers(updatedPlayers);
  }


  const addPlayer = () => {
      if (newPlayerName.length === 0) {
          alert('Merci de choisir un nom au préalable.');
          return;
      }
      setPlayers([...players, {
          id: players.length + 1,
          name: newPlayerName,
          unwantedRoles: [],
          wantedRoles: [],
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
                <PlayerCard onClickWantedRole={onClickWantedRole} onClickBannedRole={onClickBannedRole} player={player} key={player.id}/>
            ))}
        </Stack>
        <Button variant="contained" disabled={players.length === 0} onClick={() => alert("TBD")}>Choisir les rôles</Button>

    </div>
  )
}

export default App
