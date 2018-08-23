import { Injectable } from "../../../node_modules/@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from "rxjs";

@Injectable()
export class SteamService {
    steamaApiKey:string = "BD496BFA7696FD5DE7D3FF190B371B1B";
    username:string;
    userDetail:any = [];
    constructor(private http: HttpClient){}


    //set Username
    setUsername(steamId) {
        this.userDetail = [];
        this.username = steamId;
        this.http.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + this.steamaApiKey + "&steamids=" + steamId).subscribe(
            (res) => {
                this.userDetail.push(res["response"].players[0].personaname);
                this.userDetail.push(res["response"].players[0].avatar);
                this.userDetail.push(steamId);
            }
        )
        return this.userDetail;
    }

    //get friends steamIDs and return their details
    getFriendsList() {
        return this.http.get("https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=" + this.steamaApiKey + "&steamid=" + this.username).pipe(
            mergeMap(
                (res) => {
                    const friends = [];
                    for(let friend of res["friendslist"]["friends"]){
                        friends.push(this.http.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=" + this.steamaApiKey + "&steamids=" + friend.steamid))
                    }
                    return forkJoin(friends);
                }
            )
        )
    }
    //get inventory list of item indexes and return their details
    getFriendsInventory(steamId) {
        return this.http.get("http://api.steampowered.com/IEconItems_570/GetPlayerItems/v0001/?key=" + this.steamaApiKey + "&steamid=" + steamId).pipe(
            mergeMap(
                (res) => {
                    //array of observables
                    
                    const itemList = [];
                    for(let item of res["result"].items) {
                        itemList.push(this.http.get("http://localhost:3000/items", { params: { index: item.defindex } }) );
                    }
                    return forkJoin(itemList);
                }
            )
        )
        //return this.http.get("http://localhost:3000/items", {params:{steamId: steamId}})
    }

    // get specific item details
    getItem(index) {
        return this.http.get("http://localhost:3000/items", { params: { index: index } });
    }


}