import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventsBoardComponent} from "./pages/events-board/events-board.component";
import {EventsParticipantsComponent} from "./pages/enents-participants/events-participants.component";
import {EventRegistrationComponent} from "./pages/event-registration/event-registration.component";

const routes: Routes = [
  { path: '',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsBoardComponent
  }, {
    path: 'event/:id/participants',
    component: EventsParticipantsComponent
  }, {
    path: 'events/:id/register',
    component: EventRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
