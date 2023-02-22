import {Player} from "../types/Player";

const allUsersHaveAtLeastOnePlayableRole = (players: Player[]) => {
    const playersWithNoRoleAvailable = players.filter((player) => player.acceptedRoles.length === 0);
    if (playersWithNoRoleAvailable.length > 0) {
        alert('Tous les joueurs doivent accepter au moins un rôle !');
        return false;
    }

    return true;
}

const verifyThereIsMoreRolesAvailableThanPlayers = (players: Player[]) => {
    let askedRoles: string[] = [];
    players.forEach((player) => askedRoles = [...askedRoles, ...player.acceptedRoles]);
    let uniqueAskedRoles = [...new Set(askedRoles)]; // remove duplicates

    if (uniqueAskedRoles.length < players.length) {
        alert(`Vous avez plus de joueurs que de rôles différents 😭 ! (${uniqueAskedRoles.join(', ')}) `);
        return false;
    }

    return true;
}

export const givePlayersRoles = (players: Player[]) => {

    if (!allUsersHaveAtLeastOnePlayableRole(players) || !verifyThereIsMoreRolesAvailableThanPlayers(players)) {
        return false;
    }
    // TODO: add check qu'on a au moins un nombre de role choisi égal au nombre de joueurs total

    // Make a cloning to avoid modify the players state
    const copyPlayers = players.map((player) => ({...player}));

    // Order them by the least acceptedRoles, and shuffle the equalities
    copyPlayers.sort((player1, player2) => {
        let checkNumberOfAcceptedRoles = player1.acceptedRoles.length - player2.acceptedRoles.length;
        if (checkNumberOfAcceptedRoles !== 0) {
            return checkNumberOfAcceptedRoles;
        }

        return Math.random() - 0.5;
    });

    let tentatives = 0;
    let found = false;

    while (tentatives < 1000 && !found) {
        console.log(tentatives);

        // pour chaque joueur, on donne un poste random parmi ses choix // pour la v1 UNIQUEMENT, si ca donne un truc unique ba on propose et voila
        let alreadyGivenRoles: string[] = [];
        let nextTry = false;
        for (let player of copyPlayers) {

            let acceptedRoles = player.acceptedRoles;
            const filteredRoles = acceptedRoles.filter(value => !alreadyGivenRoles.includes(value));
            if (filteredRoles.length > 0) {
                const givenRole = filteredRoles[Math.floor(Math.random() * filteredRoles.length)];
                alreadyGivenRoles.push(givenRole);
                player.givenRole = givenRole;
            } else {
                nextTry = true;
                break;
            }
        }

        if (nextTry) {
            tentatives++;
            continue;
        }

        console.log('Solution found !');
        console.log(copyPlayers);
        found = true;
    }

    if (found) {
        copyPlayers.sort((player1, player2) => {
            return player1.id - player2.id;
        })
        return copyPlayers;
    }

    alert('Désolé, nous n\'avons pas pu trouver de solution 😭');
    return null;
}