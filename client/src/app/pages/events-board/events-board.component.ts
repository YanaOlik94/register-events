import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EventService} from "../../services/event.service";
import {RegisteredEvent} from "../../classes/event.class";
import {eventList} from "../../mocks/mocks";

@Component({
  selector: 'app-events-board',
  templateUrl: './events-board.component.html',
  styleUrl: './events-board.component.css'
})
export class EventsBoardComponent implements OnInit {

  events: RegisteredEvent[] = [];
  isMocked: boolean = false;
  isSorting: boolean = false;
  eventsLength: number = 0;
  current: number = 1;
  perPage: number = 10;
  filter: any;

  SORT = {
    TITLE: 'title',
    EVENT_DATE: 'eventDate',
    ORGANIZER: 'organizer',
    DEFAULT: 'eventDate'
  }

  sorting: string = this.SORT.DEFAULT;
  direction: string | undefined = 'asc';


  constructor(private router: Router,
              private eventService: EventService,) {
  }

  ngOnInit() {
    this.getEventList();
  }

  getEventList(sort?: string, direction?: string) {
    this.eventService.getAllEvents(this.perPage, this.current * this.perPage, sort, direction).subscribe((response) => {
      this.events = response.events;
      this.eventsLength = response.count;
      this.isMocked = false;
    }, (err: any) => {
      console.log(err);
      this.isMocked = true;
      this.events = eventList;
    })

}

  openEventDetails(event: RegisteredEvent) {
    this.router.navigate([`/event/${event.id}/participants`]);
  }

  registerOnEvent(event: RegisteredEvent) {
    this.router.navigate([`/events/${event.id}/register`]);
  }

  registerOnMockEvent(event: RegisteredEvent) {
    this.router.navigate([`/events/${event.id}/register`]);
  }

  openMockEventDetails(event: RegisteredEvent) {
    this.router.navigate([`/event/${event.id}/participants`]);
  }

  totalPages() {
    return Math.ceil(this.eventsLength / this.perPage);
  }

  prevPage(event: any) {
    if (this.current > 1) {
      this.current--;
      if (this.sorting !== this.SORT.DEFAULT) {
        this.getEventList(this.sorting, this.direction);
      } else
        this.getEventList();
    }
  }

  nextPage(event: any) {
    if (this.current < this.totalPages()) {
      this.current++;
      if (this.sorting !== this.SORT.DEFAULT) {
        this.getEventList(this.sorting, this.direction);
      } else
        this.getEventList();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.current = page;
      if (this.sorting !== this.SORT.DEFAULT) {
        this.getEventList(this.sorting, this.direction);
      } else
        this.getEventList();
    }
  }

  getEventFiltered(e: any, direction?: string) {
    if (e === 'eventDate') {
      this.sorting = this.SORT.EVENT_DATE;
      this.direction = direction;
      this.getEventList(this.SORT.EVENT_DATE, direction)
    } else if (e === 'organizer') {
      this.sorting = this.SORT.ORGANIZER;
      this.direction = direction;
      this.getEventList(this.SORT.ORGANIZER, direction)
    } else if (e === 'title') {
      this.sorting = this.SORT.TITLE;
      this.direction = direction;
      this.getEventList(this.SORT.TITLE, direction)
    }
  }
}
