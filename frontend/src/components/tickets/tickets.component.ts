import { AfterViewInit, Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetTicketService } from '../../services/getTicketByUser/get-ticket.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {

  constructor( @Inject(DOCUMENT) private document: Document, private getTicket: GetTicketService) {}

  @ViewChild('divRef') divRef!: ElementRef;
  email: string | null = ''
  totalTickets: any = []
  hasTickets = signal<boolean | null>(null)
  numberofTickets: number = 0

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    let userEmail = localStorage?.getItem('userEmail')

    if (userEmail) {
      this.email = userEmail
      this.GetTicketsByUser()
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
    this.getTicket.getTicketByUser(this.email).subscribe((response: any) => {
      console.log(response);
      this.totalTickets = response
      this.numberofTickets = response.length
      this.CheckTicket()
    })
  }

}
