import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/model/event';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  newEvent$: Observable<Event> = new Observable(subscriber => {
    subscriber.next(new Event());

  });

  // 1. Kiolvasni az id paramétert az URL-ből.
  // 2. Ezzel a paraméterrel meghívni az EventService.get metódust.

  event$: Observable<Event> = this.activatedRoute.params.pipe(
    switchMap( params => {
      let eventFromList$: Observable<Event> = this.eventService.get(params['id']);
      console.log(params['id']);

      if(params['id'] == 0) {
        console.log(this.newEvent$)
        return this.newEvent$
      }
      eventFromList$.subscribe(event => {console.log(event)})
      return eventFromList$;
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  onUpdate(eventForm: any, event: Event): void {
    if(event.id == 0) {
      // event.id = 1010
      /* todo need to get a free, non-used id from the list
         seems have to be under 1000 */
      this.eventService.create(event).subscribe({
        next: (event) => {
          // console.log(event);
          this.router.navigate(['/']);
        },
        error: (err) => console.error(err),
      });
      return
    }

    this.eventService.update(event).subscribe({
      next: (event) => {
        // console.log(event);
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err),
    });
  }



}
