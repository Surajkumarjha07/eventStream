import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateEventService } from '../../services/createEvent/create-event.service';
import { PaymentPageComponent } from "../payment-page/payment-page.component";
import { PaymentsService } from '../../services/payments/payments.service';

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
  eventType = signal<string>('')
  // isDisabled = signal<boolean>(false)
  isDisabled: boolean = false
  goForPayment: boolean = false
  paymentResponse: any | null = {}

  constructor(@Inject(DOCUMENT) private document: Document, private createEventService: CreateEventService, private paymentsService: PaymentsService ) { 
    const localStorage = document.defaultView?.localStorage;
    const email = localStorage?.getItem('userEmail')
    if (email) {
      this.userEmail.set(email)
    }
    console.log(this.userEmail());

    this.createEvent.get('event_creator')?.setValue(this.userEmail());
  }

  createEvent = new FormGroup({
    event_creator: new FormControl<string | null>(this.userEmail(), [Validators.required]),
    title: new FormControl<string | null>('', [Validators.required,]),
    category: new FormControl<string | null>('', [Validators.required]),
    date: new FormControl<string | null>('', [Validators.required,]),
    start_time: new FormControl<string | null>('', [Validators.required]),
    end_time: new FormControl<string | null>('', [Validators.required]),
    type: new FormControl<string | null>('', [Validators.required]),
    location: new FormControl<string | null>('', [Validators.required,]),
    building: new FormControl<string | null>('', []),
    region: new FormControl<string | null>('', []),
    venue: new FormControl<string | null>('', []),
    price: new FormControl<number | null>(null, Validators.required),
    capacity: new FormControl<number | null>(null, [Validators.required]),
  })

  disable() {
    this.isDisabled = !this.isDisabled

    if (this.isDisabled === true) {
      this.createEvent.get('price')?.disable()
    }
    else {
      this.createEvent.get('price')?.enable()
    }
  }

  fileGroup = new FormGroup({
    event_img: new FormControl<BinaryData | null>(null, [
      Validators.required
    ])
  })

  doPayment() {
    this.goForPayment = !this.goForPayment
    console.log(this.createEvent.controls.price.value);
    
    this.paymentsService.sendData(19900).subscribe(response => {
      this.paymentResponse = response
      console.log(response);
      console.log('Object: ',this.paymentResponse);
    })
    
    
  }

  getLocType(e: Event) {
    const targetVal = e.target as HTMLDivElement
    if (targetVal.innerHTML) {
      this.eventType.set(targetVal.innerHTML)
      console.log(this.eventType());
    }

    this.createEvent.get('type')?.setValue(this.eventType());
    // targetVal.style.backgroundColor = 'rgb(96, 165, 250)'

  }

  showLocDetails() {
    this.LocDetails = !this.LocDetails
  }

  // this.createEventService.sendData(formData.event_creator,formData.title,formData.category,formData.date,formData.start_time, formData.end_time, formData.type, formData.location, formData.building, formData.region, formData.venue, formData.price, formData.capacity, fileData.event_img).subscribe((response) => {
  //   console.log('Event Created', response);
  // })

  create() {
    const formData = {
      event_creator: this.createEvent.value.event_creator ?? null,
      title: this.createEvent.value.title ?? null,
      category: this.createEvent.value.category ?? null,
      date: this.createEvent.value.date ?? null,
      start_time: this.createEvent.value.start_time ?? null,
      end_time: this.createEvent.value.end_time ?? null,
      type: this.createEvent.value.type ?? null,
      location: this.createEvent.value.location ?? null,
      building: this.createEvent.value.building ?? null,
      region: this.createEvent.value.region ?? null,
      venue: this.createEvent.value.venue ?? null,
      price: this.createEvent.value.price ?? null,
      capacity: this.createEvent.value.capacity ?? null
    }

    console.log(formData.event_creator);


    this.createEventService.sendData(formData).subscribe(response => {
      console.log("event created", response);
    })
  }

}
