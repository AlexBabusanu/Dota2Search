import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { CoreModule } from './core/core.module';
import { SteamService } from './shared/steamApi.service';
import { HttpClientModule } from "@angular/common/http"
import { PageService } from './shared/pagination.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule, 
    CoreModule,
    HttpClientModule
  ],
  providers: [
    SteamService,
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
