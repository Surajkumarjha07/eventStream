import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, effect, HostListener, Inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaymentPageComponent } from "../payment-page/payment-page.component";
import { PaymentsService } from '../../services/payments/payments.service';
import { EventsService } from '../../services/events/events.service';
declare var Razorpay: any

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, PaymentPageComponent],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.css'
})
export class EventFormComponent {

  LocDetails: boolean = false
  userEmail = signal<string>('')
  eventType = signal<string>('Venue')
  isDisabled: boolean = false
  goForPayment: boolean = false
  paymentResponse: any | null = {}
  hideLocDetails: boolean = false
  selectedDiv: number = 0
  choosenFile: File | null = null
  smallDevice = signal<boolean>(false)
  razorpay_signature = signal<string | null>('')
  TypesArray: any | null = [
    { img: 'https://cdn-icons-png.freepik.com/256/402/402326.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'Venue' },
    { img: 'https://cdn-icons-png.freepik.com/256/5762/5762756.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'Online event' },
    { img: 'https://cdn-icons-png.freepik.com/256/7806/7806633.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'To be announced' }
  ]

  constructor(@Inject(DOCUMENT) private document: Document, private eventServices: EventsService, private paymentsService: PaymentsService) {
    const localStorage = document.defaultView?.localStorage;
    const email = localStorage?.getItem('userEmail')
    if (email) {
      this.userEmail.set(email)
    }
    console.log(this.userEmail());

    if (typeof window !== 'undefined') {
      this.createEvent.get('event_creator')?.setValue(this.userEmail());
      if (window.innerWidth < 1370) {
        this.smallDevice.set(true)
        console.log('amalldem');
      }
    }

    this.paymentsService.sendData(19900).subscribe(response => {
      this.paymentResponse = response
      console.log(response);
      console.log('Object: ', this.paymentResponse);
    })

    effect(() => {
      if (this.razorpay_signature()) {
        this.create()
      }
    })
  }

  createEvent = new FormGroup({
    event_creator: new FormControl<string | null>(this.userEmail(), [Validators.required]),
    title: new FormControl<string | null>('', [Validators.required,]),
    category: new FormControl<string | null>('', [Validators.required]),
    date: new FormControl<string | null>('', []),
    start_time: new FormControl<string | null>('', []),
    end_time: new FormControl<string | null>('', []),
    type: new FormControl<string | null>('', [Validators.required]),
    location: new FormControl<string | null>('', []),
    building: new FormControl<string | null>('', []),
    region: new FormControl<string | null>('', []),
    venue: new FormControl<string | null>('', []),
    price: new FormControl<number | null>(null, []),
    capacity: new FormControl<number | null>(null, [Validators.required]),
  })

  @HostListener('window:resize')
  documentResize() {
    if (window.innerWidth < 1370) {
      this.smallDevice.set(true)
      console.log('amalldem');
    }
  }


  makePayment = async () => {

    const options = {
      "key": "rzp_test_RNopBpvUbcKwIf", // Enter the Key ID generated from the Dashboard
      "amount": `${this.createEvent.controls.price.value}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "USD",
      "name": "eventStream Pvt. Ltd.",
      "description": "Event Booking Transaction",
      "image": "https://whattheai.tech/wp-content/uploads/2023/08/Logo_NixerAI.png",
      "order_id": `${this.paymentResponse?.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1 - "order_IluGWxBm9U8zJ8"
      "handler": (response: any) => {
        console.log(response);
        this.razorpay_signature.set(response.razorpay_signature)
        console.log('responsecode', this.razorpay_signature());
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

  disable() {
    this.isDisabled = !this.isDisabled

    if (this.isDisabled === true) {
      this.createEvent.get('price')?.disable()
    }
    else {
      this.createEvent.get('price')?.enable()
    }
  }

  getLocType(e: Event, index: number) {
    const targetVal = e.target as HTMLDivElement
    this.selectedDiv = index

    if (targetVal.children[1].innerHTML) {
      this.eventType.set(targetVal.children[1].innerHTML)
      this.hideLocDetails = false
    }

    if (targetVal.children[1].innerHTML.trim() === 'Online event') {
      this.eventType.set(targetVal.children[1].innerHTML)
      this.hideLocDetails = true
      this.LocDetails = false
    }
    console.log(this.eventType());

    this.createEvent.get('type')?.setValue(this.eventType());
  }

  showLocDetails() {
    this.LocDetails = !this.LocDetails
  }

  getFile(e: Event) {
    let target = e.target as HTMLInputElement
    if (target.files && target.files?.length > 0) {
      this.choosenFile = target.files[0]
      console.log(this.choosenFile);
    }
  }

  getSignature(e: string | null) {
    this.razorpay_signature.set(e)
    console.log("rc = ", e);
  }

  doPayment() {
    if (this.smallDevice()) {
      this.makePayment()
    }
    else{
      this.goForPayment = !this.goForPayment
      console.log(this.createEvent.controls.price.value);
    }

  }

  create() {
    const formData = new FormData();

    formData.append('event_creator', this.createEvent.value.event_creator?.trim() ?? '');
    formData.append('title', this.createEvent.value.title?.trim() ?? '');
    formData.append('category', this.createEvent.value.category?.trim() ?? '');
    formData.append('date', this.createEvent.value.date?.trim() ?? '');
    formData.append('start_time', this.createEvent.value.start_time?.trim() ?? '');
    formData.append('end_time', this.createEvent.value.end_time?.trim() ?? '');
    formData.append('type', this.createEvent.value.type?.trim() ?? '');
    formData.append('location', this.createEvent.value.location?.trim() ?? '');
    formData.append('building', this.createEvent.value.building?.trim() ?? '');
    formData.append('region', this.createEvent.value.region?.trim() ?? '');
    formData.append('venue', this.createEvent.value.venue?.trim() ?? '');
    formData.append('price', this.createEvent.value.price?.toString() ?? '');
    formData.append('capacity', this.createEvent.value.capacity?.toString() ?? '');

    if (this.choosenFile) {
      formData.append('event_img', this.choosenFile)
    }

    this.eventServices.createEvents(formData).subscribe(response => {
      console.log("event created", response);
      this.goForPayment = false
    })
  }

}
