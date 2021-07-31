import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import {LoggingService} from "./logging.service";
import {AccountsService} from "./accounts.service";



@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    NewAccountComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule
  ],
  providers: [LoggingService, AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
