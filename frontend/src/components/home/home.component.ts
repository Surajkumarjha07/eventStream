import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { RouterModule } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  fetchedEvents: any | null = []
  DelhiEvents: any | null = []
  loading: boolean = true

  private eventServices = inject(EventsService)

  ngOnInit(): void {
    this.eventServices.getallEvents().subscribe(response => {
      this.fetchedEvents = response
      this.DelhiEvents = Array.from(this.fetchedEvents.filter((event: any) => event.location === 'Delhi'))
      this.loading = false
    })
  }


}
