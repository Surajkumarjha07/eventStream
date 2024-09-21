import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventFormComponent } from '../event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentsService } from '../../services/payments/payments.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
declare var Razorpay: any

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [RouterModule, CommonModule, EventFormComponent, ReactiveFormsModule],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'translateX(0%)'
      })),

      state('close', style({
        opacity: 0,
        zIndex: -1,
        transform: 'translateX(-100%)'
      })),

      transition('close => open', animate('0.5s ease-out')),
      transition('open => close', animate('0.5s ease-in')),
    ])
  ]
})
export class PaymentPageComponent implements OnInit {

  constructor(public createForm: EventFormComponent, private paymentsService: PaymentsService) { }

  captchaCode: number = 0
  captchaMatched: boolean = false
  ResponseCode: string | null = ''
  @Input() goForPayment!: boolean
  @Input() price: number | null = 0
  @Input() event_creator: string | null = ''
  @Input() paymentResponse: any | null = {}
  @Output() razorpay_signature = new EventEmitter<string | null>()

  generateCaptcha() {
    let min = 12000
    let max = 95000
    let captcha = Math.floor(Math.random() * (max - min)) + min
    this.captchaCode = captcha

  }

  ngOnInit(): void {
    this.generateCaptcha()
  }

  checkCaptcha(e: Event) {
    let target = e.target as HTMLInputElement
    if (Number(target.value) == this.captchaCode) {
      this.captchaMatched = true
    }
    else {
      this.captchaMatched = false
    }
  }

  cancelPayment() {
    this.goForPayment = !this.goForPayment
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
      "handler": (response: any) => {
        console.log(response);
        this.ResponseCode = response.razorpay_signature
        console.log('responsecode', this.ResponseCode);
        this.razorpay_signature.emit(this.ResponseCode)
        alert('Payment Successfull!')
      },
      "theme": {
        "color": "#FF5500"
      }
    };

    if (this.paymentResponse.id) {
      const paymentObject = await new Razorpay(options);
      paymentObject.open()
    }
  }

}
