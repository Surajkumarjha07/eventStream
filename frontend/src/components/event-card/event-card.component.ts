import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  
  constructor(private router: Router) {}
  
  @Input() description: string | null = ''
  @Input() date: string | null = ''
  @Input() start_time: string | null = ''
  @Input() location: string | null = ''
  @Input() price: number | null = 0
  @Input() img: string | null = ''
  @Input() event_creator: string | null = ''
  @Input() event_img: string | null = ''

  viewCard() {
    this.router.navigate(['/eventInfo'], {
      queryParams: {description: this.description, event_creator: this.event_creator, date: this.date, start_time: this.start_time, location: this.location, price: this.price, event_img: this.event_img},
      queryParamsHandling: 'merge'
    })
    
  }

}
