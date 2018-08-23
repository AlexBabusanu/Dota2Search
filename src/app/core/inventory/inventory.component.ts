import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SteamService } from '../../shared/steamApi.service';
import { PageService } from '../../shared/pagination.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  
  items:any = [];

  pager:any = {};

  pagedItems:any = [];

  array = [];

  constructor(private route: ActivatedRoute, private steamApi: SteamService, private pageService:PageService) { }

  ngOnInit() {
    this.steamApi.getFriendsInventory(this.route.snapshot.params.id).subscribe(
      (res) => {
        this.items = res;
       

        this.setPage(1);
      }
    )


  }

  search(itemName) {
    if(itemName.target.value === "") {
      this.array = [];
    }
    else {
    this.array = this.items.filter(
      item => item.name.includes(itemName.target.value)
      
    )
  }
  }



  setPage(page:number){
    this.pager = this.pageService.getPages(this.items.length, page);

    
    this.pagedItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    
  }
}
