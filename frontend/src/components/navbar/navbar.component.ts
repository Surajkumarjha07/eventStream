import { CommonModule, DOCUMENT, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, UpperCasePipe, LowerCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  loginToken: any = ''
  email: any = ''
  name: any = ''
  searchClicked!: boolean
  searchInput: string = ''
  defaultList: any = []
  TotalSearches: any | null = []
  fetchedEvent: any | null = []
  @Output() searchActive = new EventEmitter<boolean>()

  constructor(@Inject(DOCUMENT) private document: Document, private eventServices: EventsService, private router: Router) {
    const localStorage = document.defaultView?.localStorage;
    this.loginToken = localStorage?.getItem('loginToken')
    this.email = localStorage?.getItem('userEmail')
    this.name = localStorage?.getItem('userName')
  }

  ngOnInit(): void {
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
