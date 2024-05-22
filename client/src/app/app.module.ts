import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsBoardComponent } from './pages/events-board/events-board.component';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {EventsParticipantsComponent} from "./pages/enents-participants/events-participants.component";
import {EventRegistrationComponent} from "./pages/event-registration/event-registration.component";
import {LengthPipe} from "./pipes/length.pipe";
import {PaginationComponent} from "./components/pagination/pagination.component";

@NgModule({
  declarations: [
    AppComponent,
    EventsBoardComponent,
    EventsParticipantsComponent,
    EventRegistrationComponent,
    LengthPipe,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
