import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule],
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

  viewCard() {
    this.router.navigate(['/eventInfo'], {
      queryParams: {description: this.description, date: this.date, start_time: this.start_time, location: this.location, price: this.price, img: ''},
      queryParamsHandling: 'merge'
    })
    
  }

}
