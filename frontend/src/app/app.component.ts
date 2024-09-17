import { Component, Inject, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../components/navbar/navbar.component";
import { HomeComponent } from "../components/home/home.component";
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../components/footer/footer.component';
import { LoginNavComponent } from '../components/login-nav/login-nav.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { LoginFooterComponent } from "../components/login-footer/login-footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent, RouterLink, RouterModule, FooterComponent, LoginNavComponent, CommonModule, LoginFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EventStream';
  showNavbar: boolean = true;
  currentUrl: string = ''
  isLoggedIn: boolean = false
  searchActive!: boolean

  receiveMsg(e: boolean) {
    this.searchActive = e    
  }

  constructor(@Inject(DOCUMENT) private document: Document ,private router: Router) {
    const localStorage = document.defaultView?.localStorage;
    
    let loginToken = localStorage?.getItem('loginToken')

    if (loginToken) {
      this.isLoggedIn = true
    }
   }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        this.currentUrl = event.urlAfterRedirects

        if (this.currentUrl.includes('signUp') || this.currentUrl.includes('login') || this.currentUrl.includes('eventForm') || this.currentUrl.includes('payment')) {
          this.showNavbar = false
        }
        else{
          this.showNavbar = true
        }

      }
    })
  }

}
