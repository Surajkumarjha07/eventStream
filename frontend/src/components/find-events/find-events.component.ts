import { Component, inject, OnInit, signal } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventsService } from '../../services/events/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-find-events',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './find-events.component.html',
  styleUrl: './find-events.component.css'
})
export class FindEventsComponent implements OnInit {

  fetchedEvents: any | null = []
  loading: boolean = true

  private eventServices = inject(EventsService)

  ngOnInit(): void {
    this.loading = true
      this.eventServices.getallEvents().subscribe((response) => {
        console.log("Events fetched", response);
        this.fetchedEvents = response
        this.loading = false
      })
  }

}
