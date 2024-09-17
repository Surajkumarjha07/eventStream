import { Component, inject, OnInit } from '@angular/core';
import { EventCardComponent } from "../event-card/event-card.component";
import { Router, RouterModule } from '@angular/router';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventCardComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) {}

  fetchedEvents: any | null = []

  private eventServices = inject(EventsService)

  ngOnInit(): void {
      this.eventServices.getallEvents().subscribe(response => {
        this.fetchedEvents = response        
      })

  }  
  

}
