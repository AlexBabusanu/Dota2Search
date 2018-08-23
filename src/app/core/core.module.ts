import { NgModule } from "../../../node_modules/@angular/core";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { AppRouter } from "../appRouter.module";
import { CommonModule } from "../../../node_modules/@angular/common";
import { FormsModule } from "@angular/forms";
import { ItemDetailComponent } from "./inventory/item-detail/item-detail.component";



@NgModule({
    declarations:[
        HeaderComponent,
        HomeComponent,
        InventoryComponent,
        ItemDetailComponent
    ],
    imports:[
        AppRouter,
        CommonModule,
        FormsModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        
    ]
})

export class CoreModule {}