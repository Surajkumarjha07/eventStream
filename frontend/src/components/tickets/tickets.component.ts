import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { TicketsService } from '../../services/tickets/tickets.service';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private ticketServices: TicketsService, private eventServices: EventsService) { }

  email: string | null = ''
  totalTickets: any = []
  hasTickets = signal<boolean | null>(null)
  numberofTickets: number = 0
  OpenClicked: boolean = false
  fetchedEvent: any | null = []
  interSectionObserver!: IntersectionObserver

  @ViewChild('divRef2') divRef2!: ElementRef;
  @ViewChild('divRef') divRef!: ElementRef;

  @HostListener('document:scroll')
  documentScroll() {
    this.interSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === this.divRef2.nativeElement && !entry.isIntersecting) {
          this.divRef2.nativeElement.classList.add('anime')
        }

        if (entry.target === this.divRef.nativeElement && entry.isIntersecting) {
          this.divRef2.nativeElement.classList.remove('anime')
        }
      });
    })

    this.interSectionObserver.observe(this.divRef.nativeElement)
    this.interSectionObserver.observe(this.divRef2.nativeElement)
  }

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
    }
    else {
      this.hasTickets.set(false)
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

  eventClicked(e: Event) {
    let target = e.target as HTMLParagraphElement
    let title = target.innerText.trim()
    console.log(title);

    this.eventServices.getEventsByTitle(title).subscribe(response => {
      console.log(response);
      this.fetchedEvent = response
      this.OpenClicked = true
    })

  }

  viewCard() {
    this.router.navigate(['/eventInfo'], {
      queryParams: { description: this.fetchedEvent.title, event_creator: this.fetchedEvent.event_creator, date: this.fetchedEvent.date, start_time: this.fetchedEvent.start_time, location: this.fetchedEvent.location, price: this.fetchedEvent.price, img: '' },
      queryParamsHandling: 'merge'
    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let target = event.target as HTMLElement
    if (!target.closest('.open-container') && !target.closest('.openedBox')) {
      this.OpenClicked = false
    }
  }

}
