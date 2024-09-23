import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-login-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.css'
})
export class LoginNavComponent {

  constructor(@Inject(DOCUMENT) private document: Document, private ticketServices: TicketsService, private eventServices: EventsService, private router: Router) {
    const localStorage = document.defaultView?.localStorage;

  }

  loginToken: string | null = ''
  email: string | null = ''
  name: string | null = ''
  numberofTickets: string | null = ''
  searchClicked: boolean = false
  searchInput: string = ''
  TotalSearches: any | null = []
  fetchedEvent: any | null = []
  @Output() searchActive = new EventEmitter<boolean>()

  ngOnInit(): void {
    this.loginToken = localStorage.getItem('loginToken')
    this.email = localStorage.getItem('userEmail')
    this.name = localStorage.getItem('userName')
    if (this.email) {
      this.GetTicketsByUser()
    }
    this.searchInActive()
  }

  search(e: Event) {
    let target = e.target as HTMLInputElement
    this.searchInput = target.value
    console.log('Search input:', this.searchInput); 

    if (this.searchInput !== '') {      
      this.eventServices.searchEvents(this.searchInput).subscribe(response => {
        console.log(response);
        this.TotalSearches = response   
      })
    }
    if (this.searchInput === '') {
      this.TotalSearches = [] 
    }
  }

  gotoSearch(e: Event) {
    let target = e.target as HTMLUListElement
    this.router.navigate(['/searchedEvents'], {
      queryParams: {category: target.innerText}
    })
  }

  gotoEventInfo(e: Event) {
    let target = e.target as HTMLUListElement
    this.eventServices.getEventsByTitle(target.innerText).subscribe(response => {
      console.log(response);
      this.fetchedEvent = response
    })
    
    setTimeout(() => {
      
      this.router.navigate(['/eventInfo'], {
        queryParams: {description: this.fetchedEvent.title, event_creator: this.fetchedEvent.event_creator, date: this.fetchedEvent.date, start_time: this.fetchedEvent.start_time, location: this.fetchedEvent.location, price: this.fetchedEvent.price, event_img: this.fetchedEvent.event_img},
        queryParamsHandling: 'merge'
      })
    }, 100);
  }

  toggleSuggestion() {
    this.searchClicked = true
    this.searchActive.emit(true)
  }

  GetTicketsByUser() {
    this.ticketServices.getTicketByUser(this.email).subscribe((response: any) => {
      this.numberofTickets = response.length
    })
  }

  logOut() {
    localStorage.clear()
    location.reload()
  }

  searchInActive() {
    this.document.addEventListener('click', (event) => {
      let target = event.target as HTMLElement
      
      if (!target.classList.contains('search-container')) {
        this.searchClicked = false
        this.searchActive.emit(false)
      }
    })
  }

}
