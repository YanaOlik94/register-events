import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import {User} from "../../classes/user.class";
import {RegisteredEvent} from "../../classes/event.class";

@Component({
  selector: 'app-events-participants',
  templateUrl: './events-participants.component.html',
  styleUrl: './events-participants.component.css'
})
export class EventsParticipantsComponent implements OnInit {

  participants: User[] = [];
  event!: RegisteredEvent;
  isNoRegistered: boolean = false;
  searchText: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.getParticipantsList();
    this.getEventById();
  }

  getParticipantsList(sort?: string, direction?: string) {
    this.route.params.subscribe((params: Params) => {

      this.eventService.showRegisteredUsers(params['id']).subscribe((response) => {
        this.participants = response.users;
        if (response.count === null) {
          this.isNoRegistered = true;
        }
      }, (err: any) => {
        console.log(err);
        this.isNoRegistered = true;
      })
  })
  }

  getEventById() {
    this.route.params.subscribe((params: Params) => {

      this.eventService.getEventByd(params['id']).subscribe((response) => {
        this.event = response.event;
      }, (err: any) => {
        console.log(err);
        this.isNoRegistered = true;
      })
    })
  }

  onSearch(event: any) {
    if (event.target.value.length >= 3 && (event.code === 'Enter' || event.code === 'NumpadEnter')) {
      this.eventService.searchParticipants(this.event.id, this.searchText.trim()).subscribe((response) => {
          this.participants = response.data;
        },
        (err: any) => {
          console.log(err);
        })
    }
  }

  clearSearch(event: any) {
    event.target.previousElementSibling.value = '';
    this.getParticipantsList();
  }

  goBack() {
    this.router.navigate(['events'])
  }
}
