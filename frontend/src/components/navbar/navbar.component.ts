import { CommonModule, DOCUMENT, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

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
  @Output() searchActive = new EventEmitter<boolean>()

  constructor(@Inject(DOCUMENT) private document: Document) {
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
    // if (target.) {
    // }
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
