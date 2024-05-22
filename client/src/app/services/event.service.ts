import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getAllEvents(skip: number, limit: number, q?: string, d?:string): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    const params = {
      limit: limit.toString(),
      skip: skip.toString(),
      q: q || 'title' || 'eventDate' || 'organizer',
      d: d || 'asc'
    };

    return this.http.get(`${environment.url}/events`,{
      headers: header, params
    })
      .pipe(map((res: any) => res.data, (err: any) => err));
  }


  getEventByd(eventId: number): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get(`${environment.url}/events/${eventId}`,{
      headers: header
    })
      .pipe(map((res: any) => res.data, (err: any) => err));
  }

  registerUserToEvent(body: any, eventId: number): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.post(`${environment.url}/events/${eventId}/register`, body, {headers: header})
      .pipe(map((res: any) => res, (err: any) => err));
  }

  showRegisteredUsers(eventId: number): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    return this.http.get(`${environment.url}/events/${eventId}/users`,{
      headers: header
    })
      .pipe(map((res: any) => res.data, (err: any) => err));
  }

  searchParticipants(eventId: number, search: string): Observable<any> {
    const header: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')

    let params = new HttpParams().set('search', search);

    return this.http.get<any>(`${environment.url}/events/${eventId}/users/search`, {
      headers: header, params
    })
      .pipe(map((res: any) => res, (err: any) => err));
  }

}
