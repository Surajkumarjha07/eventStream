import { Component, inject, OnInit, signal } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { GetEventsService } from '../../services/getEvents/get-events.service';

@Component({
  selector: 'app-find-events',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './find-events.component.html',
  styleUrl: './find-events.component.css'
})
export class FindEventsComponent implements OnInit {

  // fetchedEvents = signal<any>([])
  fetchedEvents: any | null = []

  private getEvents = inject(GetEventsService)

  ngOnInit(): void {
      this.getEvents.getData().subscribe((response) => {
        console.log("Events fetched", response);
        this.fetchedEvents = response
      })
  }

}