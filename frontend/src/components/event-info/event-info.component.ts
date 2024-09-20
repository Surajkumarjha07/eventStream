import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventCardComponent } from "../event-card/event-card.component";
import { PaymentsService } from '../../services/payments/payments.service';
import { DOCUMENT } from '@angular/common';
import { LikesService } from '../../services/likes/likes.service';
import { EventsService } from '../../services/events/events.service';
import { TicketsService } from '../../services/tickets/tickets.service';
declare var Razorpay: any

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [RouterModule, EventCardComponent],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private ticketServices: TicketsService, private eventService: EventsService, private paymentService: PaymentsService, private likeService: LikesService, @Inject(DOCUMENT) private document: Document) { }

  fetchedEvents: any | null = []

  description: string | null = ''
  date: string | null = ''
  start_time: string | null = ''
  location: string | null = ''
  price!: number | null
  building: string | null = ''
  region: string | null = ''
  venue: string | null = ''
  event_img: string | null = ''
  paymentResponse!: any | null
  email: string | null = ''
  name: string | null = ''
  saved: boolean = false

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.description = params['description'].trim()
      this.date = params['date'].trim()
      this.start_time = params['start_time'].trim()
      this.location = params['location'].trim()
      this.price = params['price']
      this.event_img = params['event_img']
    })

    this.eventService.getallEvents().subscribe(response => {
      this.fetchedEvents = response
    })

    this.paymentService.sendData((this.price! * 100)).subscribe(response => {
      this.paymentResponse = response
      console.log(response);
      console.log('Object: ', this.paymentResponse);
    })

    let localStorage = this.document.defaultView?.localStorage;

    let userEmail = localStorage?.getItem('userEmail')
    let userName = localStorage?.getItem('userName')
    if (userEmail && userName) {
      this.email = userEmail
      this.name = userName
    }
  }

  addToFavourite() {
    this.likeService.CreateLikes(this.name!, this.email!, this.description!).subscribe(response => {
      console.log(response);
      this.saved = true
    })
  }

  makePayment = async () => {

    const options = {
      "key": "rzp_test_RNopBpvUbcKwIf", // Enter the Key ID generated from the Dashboard
      "amount": `${this.price}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "USD",
      "name": "eventStream Pvt. Ltd.",
      "description": "Event Booking Transaction",
      "image": "https://whattheai.tech/wp-content/uploads/2023/08/Logo_NixerAI.png",
      "order_id": `${this.paymentResponse?.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1 - "order_IluGWxBm9U8zJ8"
      "handler": function (response: any) {
        alert('Payment Successfull!')
      },
      "theme": {
        "color": "#FF5500"
      }
    };

    const paymentObject = await new Razorpay(options);
    paymentObject.open()
  }

  bookEvent() {
    this.ticketServices.bookTicket(this.email, this.description, this.date, this.event_img).subscribe((response) => {
      console.log('booked event', response);
    })

    this.makePayment()
  }

}