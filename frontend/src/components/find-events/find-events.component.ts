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
  DelhiEvents: any | null = []
  OnlineEvents: any | null = []
  FestivalEvents: any | null = []
  ClassesEvents: any | null = []
  loading: boolean = true

  private eventServices = inject(EventsService)

  ngOnInit(): void {
    this.loading = true
      this.eventServices.getallEvents().subscribe((response) => {
        console.log("Events fetched", response);
        this.fetchedEvents = response
        this.DelhiEvents =  Array.from(this.fetchedEvents.filter((event: any) => event.location === 'Delhi'))
        this.OnlineEvents = Array.from(this.fetchedEvents.filter((event: any) => event.category === 'Online Event'))
        this.FestivalEvents = Array.from(this.fetchedEvents.filter((event: any) => event.category === 'Festivals and Fairs Event'))
        this.ClassesEvents = Array.from(this.fetchedEvents.filter((event: any) => event.category === 'Classes and Workshops Event'))
        this.loading = false
      })
      console.log(this.DelhiEvents);
  }
  
}
