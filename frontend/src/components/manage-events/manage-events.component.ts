import { Component, Inject, OnInit, signal } from '@angular/core';
import { GetCreatedEventsByUserService } from '../../services/getCreatedEventsByUser/get-created-events-by-user.service';
import { DOCUMENT } from '@angular/common';
import { response } from 'express';
import { GetTicketService } from '../../services/getTicketByUser/get-ticket.service';
import { DeleteEventCreatedService } from '../../services/deleteEventCreated/delete-event-created.service';
import { DeleteEventBookedService } from '../../services/deleteEventBookedd/delete-event-booked.service';

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

  constructor(private getCreatedEventsByUser: GetCreatedEventsByUserService, private getBookedEvents: GetTicketService, private deleteCreatedEvent: DeleteEventCreatedService, private deleteBookedEvent: DeleteEventBookedService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    let userEmail = localStorage?.getItem('userEmail')

    if (userEmail) {
      this.email = userEmail
      this.getCreatedEventsByUser.getCreatedEvents(this.email).subscribe((response) => {
        console.log(response);
        this.totalEventsCreated = response
      })

      this.getBookedEvents.getTicketByUser(this.email).subscribe((response) => {
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

      this.deleteCreatedEvent.deleteEvent(this.email, this.title()).subscribe(response => {
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

      this.deleteBookedEvent.deleteEvent(this.email, this.title()).subscribe(response => {
        console.log(response);
        location.reload()      
      })
    }
  }

}
