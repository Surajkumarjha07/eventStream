import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventCardComponent } from "../event-card/event-card.component";
import { GetEventsService } from '../../services/getEvents/get-events.service';

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [RouterModule, EventCardComponent],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private getEventService: GetEventsService) {}

  fetchedEvents: any | null = []

  description: string | null = ''
  date: string | null = ''
  start_time: string | null = ''
  location: string | null = ''
  price: number | null = 0
  building: string | null = ''
  region: string | null = ''
  venue: string | null = ''

  ngOnInit(): void {
      this.activatedRouter.queryParams.subscribe((params) => {
        this.description = params['description']
        this.date = params['date']
        this.start_time = params['start_time']
        this.location = params['location']
        this.price = params['price']
      })

      this.getEventService.getData().subscribe(response => {
        this.fetchedEvents = response
      })
  }

}
