export type Player = {
    id: number
    name: string,
    acceptedRoles: string[],
    givenRole: string,
    randomHash: number, // used to generate a random image for each player
}