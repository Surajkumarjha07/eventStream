import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaymentPageComponent } from "../payment-page/payment-page.component";
import { PaymentsService } from '../../services/payments/payments.service';
import { UsersService } from '../../services/users/users.service';
import { EventsService } from '../../services/events/events.service';

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
  isDisabled: boolean = false
  goForPayment: boolean = false
  paymentResponse: any | null = {}
  hideLocDetails: boolean = false
  selectedDiv: number = 0
  choosenFile: string = ''
  TypesArray: any | null = [
    {img: 'https://cdn-icons-png.freepik.com/256/402/402326.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'Venue'},
    {img: 'https://cdn-icons-png.freepik.com/256/5762/5762756.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'Online event'},
    {img: 'https://cdn-icons-png.freepik.com/256/7806/7806633.png?uid=R156296459&ga=GA1.1.823769688.1686565282&semt=ais_hybrid', text: 'To be announced'}
  ]

  constructor(@Inject(DOCUMENT) private document: Document, private eventServices: EventsService, private paymentsService: PaymentsService ) { 
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
    imageFile: new FormControl<BinaryData | null>(null, [Validators.required])
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
    console.log(target.value);
    this.choosenFile = target.value
    
  }

  // this.createEventService.sendData(formData.event_creator,formData.title,formData.category,formData.date,formData.start_time, formData.end_time, formData.type, formData.location, formData.building, formData.region, formData.venue, formData.price, formData.capacity, fileData.event_img).subscribe((response) => {
  //   console.log('Event Created', response);
  // })

  create() {
    const formData = {
      event_creator: this.createEvent.value.event_creator?.trim() ?? null,
      title: this.createEvent.value.title?.trim() ?? null,
      category: this.createEvent.value.category?.trim() ?? null,
      date: this.createEvent.value.date?.trim() ?? null,
      start_time: this.createEvent.value.start_time?.trim() ?? null,
      end_time: this.createEvent.value.end_time?.trim() ?? null,
      type: this.createEvent.value.type?.trim() ?? null,
      location: this.createEvent.value.location?.trim() ?? null,
      building: this.createEvent.value.building?.trim() ?? null,
      region: this.createEvent.value.region?.trim() ?? null,
      venue: this.createEvent.value.venue?.trim() ?? null,
      price: this.createEvent.value.price ?? null,
      capacity: this.createEvent.value.capacity ?? null,
      imageFile: this.createEvent.value.imageFile ?? null
    }

    console.log(formData.event_creator);


    this.eventServices.createEvents(formData).subscribe(response => {
      console.log("event created", response);
    })
  }

}
