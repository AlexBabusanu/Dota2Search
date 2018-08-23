import { Component, OnInit } from '@angular/core';
import { SteamService } from '../../shared/steamApi.service';
import { SteamFriend } from '../../shared/steamFriend.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  query = "";
  friendsList:SteamFriend[] = [];

  details = [];
  constructor(private steamApi: SteamService) { }

  ngOnInit() {
  }

  onSubmit(f){
    this.details = this.steamApi.setUsername(f.value.steamId)
    this.steamApi.getFriendsList().subscribe(
      (res) => {
        for(let friend of res){
          let friendModel = new SteamFriend(friend);
          if(friendModel["private"] === 3){
            this.friendsList.push(friendModel);
          }
        }
      }
    )
   
  }
  
}
