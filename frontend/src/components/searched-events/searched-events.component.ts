import { Component, OnInit } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { EventsService } from '../../services/events/events.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-searched-events',
  standalone: true,
  imports: [EventCardComponent, CommonModule],
  templateUrl: './searched-events.component.html',
  styleUrl: './searched-events.component.css'
})
export class SearchedEventsComponent implements OnInit {

  constructor(private eventServices: EventsService, private router: ActivatedRoute) { }
  fetchedEvents: any | null = []
  category: string = ''
  title: string = ''
  loading: boolean = true

  ngOnInit(): void {
    this.getEvents
    this.router.queryParams.subscribe((params) => {
      this.category = params['category'].trim()
    })

    this.getEvents()
  }


  getEvents() {
    this.loading = true
    this.category = this.category.replace('&', 'and')
    this.eventServices.getEventsByCategory(this.category).subscribe(response => {
      console.log(response);
      this.fetchedEvents = response
      this.loading = false
    })
  }

}
