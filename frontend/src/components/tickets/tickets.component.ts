import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TicketsService } from '../../services/tickets/tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit, AfterViewInit {

  constructor( @Inject(DOCUMENT) private document: Document, private ticketServices: TicketsService) {}

  @ViewChild('divRef') divRef!: ElementRef;
  email: string | null = ''
  totalTickets: any = []
  hasTickets = signal<boolean | null>(null)
  numberofTickets: number = 0

  getwidth() {
    // let width = this.divRef.nativeElement.innerWidth
    // let height = this.divRef.nativeElement.innerHeight
    // console.log(width, height);
    // // console.log(window);
    
  }

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    let userEmail = localStorage?.getItem('userEmail')

    if (userEmail) {
      this.email = userEmail
      this.GetTicketsByUser()
    }

  }
  
  ngAfterViewInit(): void {
    if (this.divRef) {
      this.getwidth()
      
    }
    
  }

  CheckTicket() {
    if (this.numberofTickets > 0) {
      this.hasTickets.set(true)
      console.log(this.hasTickets());
      console.log(this.numberofTickets);
      
    }
    else{
      this.hasTickets.set(false)
      console.log(this.hasTickets());
      console.log(this.numberofTickets);
    }
  }

  GetTicketsByUser() {
    this.ticketServices.getTicketByUser(this.email).subscribe((response: any) => {
      console.log(response);
      this.totalTickets = response
      this.numberofTickets = response.length
      this.CheckTicket()
    })
  }

}
