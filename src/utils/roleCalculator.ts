import {Player} from "../types/Player";
import {ROLES} from "../constants/Roles";


export const verifyAllUsersHaveAtLeastOnePlayableRole = (players: Player[]) => {
    console.log(players);
    const playersWithNoRoleAvailable = players.filter((player) => player.acceptedRoles.length === 0);
    if (playersWithNoRoleAvailable.length > 0) {
        alert('Tous les joueurs doivent accepter au moins un rôle !');
        return false;
    }

    return true;
}

