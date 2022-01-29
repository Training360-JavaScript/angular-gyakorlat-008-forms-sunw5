import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventsUrl: string = "https://nettuts.hu/jms/feladat/events";

  constructor(
    private http: HttpClient) {
  }

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl);
  }

  get(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.eventsUrl}/${id}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(
      `${this.eventsUrl}/${event.id}`,
      event,
    );
  }

  create(event: Event): Observable<Event> {
    return this.http.post<Event>(
      // `${this.eventsUrl}/${event.id}`, /* this works if got unique id */
      `${this.eventsUrl}`,
      event
    )
  }

  remove(id: Number): Observable<Event> {
    return this.http.delete<Event>(
      `${this.eventsUrl}/${id}`
    )
  }

  // createId():number {
  //   this.getAll().subscribe(data => {
  //     let id: number = data.sort((a, b) => a.id - b.id)[data.length - 1].id;
  //     console.log('lastId:', id);
  //     return id + 1;
  //   })
  // }



}
