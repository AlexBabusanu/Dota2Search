export class SteamFriend {
    steamId:string;
    avatar: string;
    username: string;
    onlineStatus: number;
    private: number;
    game?: string;

    constructor(steamResp) {
        let short = steamResp.response.players[0];
        this.private = short.communityvisibilitystate;
        this.steamId = short.steamid;
        this.username = short.personaname;
        this.avatar =  short.avatar;
        this.onlineStatus = short.personastate;
        this.game = short.gameextrainfo;
    }
}