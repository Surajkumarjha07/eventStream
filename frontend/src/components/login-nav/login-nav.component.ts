import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TicketsService } from '../../services/tickets/tickets.service';

@Component({
  selector: 'app-login-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.css'
})
export class LoginNavComponent {

  constructor(@Inject(DOCUMENT) private document: Document, private ticketServices: TicketsService) {
    const localStorage = document.defaultView?.localStorage;

  }

  loginToken: string | null = ''
  email: string | null = ''
  name: string | null = ''
  numberofTickets: string | null = ''
  searchClicked: boolean = false
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
    // if (target.) {
    // }
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
