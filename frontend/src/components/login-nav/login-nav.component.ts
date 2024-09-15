import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetTicketService } from '../../services/getTicketByUser/get-ticket.service';

@Component({
  selector: 'app-login-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.css'
})
export class LoginNavComponent {

  constructor(@Inject(DOCUMENT) private document: Document, private getTicket: GetTicketService) {
    const localStorage = document.defaultView?.localStorage;

  }
  
  loginToken: string | null = ''
  email: string | null = ''
  name: string | null = ''
  numberofTickets: string | null = ''

  ngOnInit(): void {
    this.loginToken = localStorage.getItem('loginToken')
    this.email = localStorage.getItem('userEmail')
    this.name = localStorage.getItem('userName')
    if (this.email) {
      this.GetTicketsByUser()
    }
  }

  
  GetTicketsByUser() {
    this.getTicket.getTicketByUser(this.email).subscribe((response: any) => {
      this.numberofTickets = response.length
    })
  }

  logOut() {
    localStorage.clear()
    location.reload()
  }

}
