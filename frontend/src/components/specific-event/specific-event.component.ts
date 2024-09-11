import { Component, Input, OnInit, signal } from '@angular/core';
import { SpecificEventService } from '../../services/specificEvent/specific-event.service';
import { ActivatedRoute } from '@angular/router';
import { EventCardComponent } from '../event-card/event-card.component';

@Component({
  selector: 'app-specific-event',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './specific-event.component.html',
  styleUrl: './specific-event.component.css'
})
export class SpecificEventComponent implements OnInit{

  constructor(private getEventService: SpecificEventService, private router: ActivatedRoute) {}
  fetchedEvents: any | null = []
  category: string | null = ''
  
    ngOnInit(): void {
      this.router.queryParams.subscribe((params) => {
        this.category = params['category']
      })
      this.getData(this.category)
    }

  getData(category: string | null) {

    this.getEventService.getData(category).subscribe(response => {
      console.log(response);
      this.fetchedEvents = response
    })
  };

}
