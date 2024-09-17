import { Component, Inject, OnInit, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventsService } from '../../services/events/events.service';
import { TicketsService } from '../../services/tickets/tickets.service';

@Component({
  selector: 'app-manage-events',
  standalone: true,
  imports: [],
  templateUrl: './manage-events.component.html',
  styleUrl: './manage-events.component.css'
})
export class ManageEventsComponent implements OnInit {

  email: string | null = ''
  totalEventsCreated: any | null = []
  totalEventsBooked: any | null = []
  title = signal<string | null>('')

  constructor(private eventServices: EventsService, private ticketServices: TicketsService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    let userEmail = localStorage?.getItem('userEmail')

    if (userEmail) {
      this.email = userEmail
      this.eventServices.getCreatedEventsByUser(this.email).subscribe((response) => {
        console.log(response);
        this.totalEventsCreated = response
      })

      this.ticketServices.getTicketByUser(this.email).subscribe((response) => {
        console.log(response);
        this.totalEventsBooked = response
      })
    }
  }

  deleteCEvent(e: Event) {
    let target = e.target as HTMLImageElement
    let par = target.parentElement?.parentElement?.children[0]?.children[1]?.textContent?.trim() || '';
    if (par) {
      this.title.set(par)
      console.log(this.email);
      console.log(this.title());
    }

    if (this.email && this.title()) {

      this.eventServices.deleteEventCreated(this.email, this.title()).subscribe(response => {
        console.log(response);
        location.reload()      
      })
    }

  }

  deleteBEvent(e: Event) {
    let target = e.target as HTMLImageElement
    let par = target.parentElement?.parentElement?.children[0].children[1].textContent?.trim() || ''
    this.title.set(par)
    console.log(this.email);
    console.log(this.title());

    if (this.email && this.title()) {

      this.eventServices.deleteEventBooked(this.email, this.title()).subscribe(response => {
        console.log(response);
        location.reload()      
      })
    }
  }

}
