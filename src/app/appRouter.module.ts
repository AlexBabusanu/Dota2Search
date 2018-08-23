import { NgModule } from "../../node_modules/@angular/core";
import { RouterModule, Routes } from "../../node_modules/@angular/router";
import { HomeComponent } from "./core/home/home.component";
import { InventoryComponent } from "./core/inventory/inventory.component";
import { ItemDetailComponent } from "./core/inventory/item-detail/item-detail.component";

const routes: Routes = [
    { path:"", component:HomeComponent },
    { path:"inventory/:id", children:[
        {path:"", component: InventoryComponent},
        {path:":index", component: ItemDetailComponent}
    ] }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRouter {}