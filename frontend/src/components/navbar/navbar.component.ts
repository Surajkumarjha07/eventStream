import { CommonModule, DOCUMENT, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, UpperCasePipe, LowerCasePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  
  loginToken: any = ''
  email: any = ''
  name: any = ''

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    this.loginToken = localStorage?.getItem('loginToken')
    this.email = localStorage?.getItem('userEmail')
    this.name = localStorage?.getItem('userName')
  }

}
