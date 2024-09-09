import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {

  constructor() {
    console.log(window.innerHeight);
    console.log(window.innerWidth);        
  }

  
}
