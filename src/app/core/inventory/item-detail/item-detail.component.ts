import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { SteamService } from '../../../shared/steamApi.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  id:number;
  item = {};
  constructor(private route: ActivatedRoute, private steamApi: SteamService) { }

  ngOnInit() {
     this.steamApi.getItem(this.route.snapshot.params.index).subscribe(
       (res) => {
         this.item = res;
       } 
    )
    }

}
