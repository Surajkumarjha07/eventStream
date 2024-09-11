import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventCardComponent } from "../event-card/event-card.component";
import { GetEventsService } from '../../services/getEvents/get-events.service';
import { PaymentsService } from '../../services/payments/payments.service';
declare var Razorpay: any

@Component({
  selector: 'app-event-info',
  standalone: true,
  imports: [RouterModule, EventCardComponent],
  templateUrl: './event-info.component.html',
  styleUrl: './event-info.component.css'
})
export class EventInfoComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private getEventService: GetEventsService, private paymentService: PaymentsService) { }

  fetchedEvents: any | null = []

  description: string | null = ''
  date: string | null = ''
  start_time: string | null = ''
  location: string | null = ''
  price!: number | null
  building: string | null = ''
  region: string | null = ''
  venue: string | null = ''
  paymentResponse!: any | null

  ngOnInit(): void {
    this.activatedRouter.queryParams.subscribe((params) => {
      this.description = params['description']
      this.date = params['date']
      this.start_time = params['start_time']
      this.location = params['location']
      this.price = params['price']
    })

    this.getEventService.getData().subscribe(response => {
      this.fetchedEvents = response
    })

    this.paymentService.sendData((this.price!*100)).subscribe(response => {
      this.paymentResponse = response
      console.log(response);
      console.log('Object: ', this.paymentResponse);
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

}