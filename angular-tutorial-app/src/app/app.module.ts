import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroCreateComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
