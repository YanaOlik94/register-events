import {User} from "./user.class";

export class RegisteredEvent {
  id: number = 0;
  title: string = '';
  description: string = '';
  eventData: Date = new Date();
  organizer: string = '';
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date()
}
