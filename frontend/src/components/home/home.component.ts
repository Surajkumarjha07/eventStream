import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { RouterModule } from '@angular/router';
import { GetEventsService } from '../../services/getEvents/get-events.service';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  fetchedEvents: any | null = []

  private getEventService = inject(GetEventsService)

  ngOnInit(): void {
      this.getEventService.getData().subscribe(response => {
        this.fetchedEvents = response        
      })
  }  

}
