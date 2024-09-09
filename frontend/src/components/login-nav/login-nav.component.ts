import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './login-nav.component.html',
  styleUrl: './login-nav.component.css'
})
export class LoginNavComponent {

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

  }
  
  loginToken: string | null = ''
  email: string | null = ''
  name: string | null = ''

  ngOnInit(): void {
    this.loginToken = localStorage.getItem('loginToken')
    this.email = localStorage.getItem('userEmail')
    this.name = localStorage.getItem('userName')
  }

}
