import { readFileSync } from "node:fs";

type Role = "tank" | "damage" | "support";
type MatchStatus = "scheduled" | "live" | "finished";

interface Stats {
    kills: number;
    deaths: number;
    assists: number;
}

interface Clan {
    tag: string;
    joinedAt: string;
}

interface Player {
    gamertag: string;
    realName?: string;
    role: Role;
    stats: Stats;
    clan?: Clan;
}

interface Team {
    tag: string;
    name: string;
    players: Player[];
}

interface Venue {
    school: string;
    room: string;
}

interface Score {
    teamA: number;
    teamB: number;
}

interface Match {
    id: number;
    round: number;
    teamA: string;
    teamB: string;
    status: MatchStatus;
    score: Score | null;
    mvp?: string;
}

interface Tournament {
    id: number;
    name: string;
    game: string;
    startsAt: string;
    venue: Venue;
    teams: Team[];
    matches: Match[];
}

// In a real app, this data comes from a REST API. Here we read it from a file.
const tournament: Tournament = JSON.parse(readFileSync("tournament.json", "utf8"));

/**
 * Calculates the KDA value: (kills + assists) / deaths.
 * A player with 0 deaths counts as if they had 1 death.
 */
function calcKda(stats: Stats): number {
    const deaths = Math.max(stats.deaths, 1);
    return (stats.kills + stats.assists) / deaths;
}

/** Adds up the kills of all players in a team. */
function totalKills(team: Team): number {
    return team.players.reduce((sum, player) => sum + player.stats.kills, 0);
}

/** Formats one player, e.g. "byteMe [NPN] tank, KDA 5.25". */
function formatPlayer(player: Player): string {
    const clanTag = player.clan?.tag ?? "-";
    return `${player.gamertag} [${clanTag}] ${player.role}, KDA ${calcKda(player.stats).toFixed(2)}`;
}

/** Finds a team by its tag and throws if it does not exist. */
function findTeam(tag: string): Team {
    const team = tournament.teams.find(team => team.tag === tag);
    if (team === undefined) {
        throw new Error(`Team ${tag} not found.`);
    }
    return team;
}

/** Finds a player by gamertag across all teams. */
function findPlayer(gamertag: string): Player | undefined {
    for (const team of tournament.teams) {
        const player = team.players.find(player => player.gamertag === gamertag);
        if (player !== undefined) {
            return player;
        }
    }
    return undefined;
}

/** Returns the winner's team tag, "draw", or "not played" if there is no score. */
function winner(match: Match): string {
    if (match.score === null) {
        return "not played";
    }
    if (match.score.teamA > match.score.teamB) return match.teamA;
    if (match.score.teamB > match.score.teamA) return match.teamB;
    return "draw";
}

/** Formats a match, e.g. "Round 1: Null Pointer Ninjas 13:9 Ctrl Alt Defeat". */
function formatMatch(match: Match): string {
    const nameA = findTeam(match.teamA).name;
    const nameB = findTeam(match.teamB).name;
    if (match.score === null) {
        return `Round ${match.round}: ${nameA} vs ${nameB}`;
    }
    let line = `Round ${match.round}: ${nameA} ${match.score.teamA}:${match.score.teamB} ${nameB}`;
    if (match.status === "finished") {
        line += ` -> winner: ${winner(match)}`;
    }
    return line;
}

/** Prints a team and all its players. */
function printTeam(team: Team): void {
    console.log(`${team.name} (${team.tag}), total kills: ${totalKills(team)}`);
    team.players.forEach(player => console.log("  " + formatPlayer(player)));
}

// A new player joins team 5BAIF.
const newPlayer: Player = {
    gamertag: "noob42",
    role: "support",
    stats: { kills: 0, deaths: 0, assists: 0 }
};
findTeam("5BAIF").players.push(newPlayer);

console.log(`=== ${tournament.name} in room ${tournament.venue.room} ===`);
tournament.teams.forEach(team => printTeam(team));
tournament.matches.forEach(match => console.log(formatMatch(match)));

const mvpGamertag = tournament.matches[0]?.mvp;
if (mvpGamertag !== undefined) {
    const mvp = findPlayer(mvpGamertag);
    if (mvp !== undefined) {
        console.log(`MVP of round 1: ${formatPlayer(mvp)}`);
    }
}
