import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes/likes.service';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent implements OnInit {

  constructor(private likesService: LikesService, private eventServices: EventsService, @Inject(DOCUMENT) private document: Document, private router: Router) {}

  fetchedLikes: any | null = []
  title: string = ''
  email: string = ''
  show: boolean = false
  fetchedEvent: any | null = []
  OpenClicked: boolean = false

  ngOnInit(): void {
    let localStorage = this.document.defaultView?.localStorage
    let userEmail = localStorage?.getItem('userEmail')
    if (userEmail) { 
      this.email = userEmail
      this.likesService.getLikes(this.email!).subscribe(response => {
        console.log(response);
        this.fetchedLikes = response
      })
    }
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
      queryParams: {description: this.fetchedEvent.title, event_creator: this.fetchedEvent.event_creator, date: this.fetchedEvent.date, start_time: this.fetchedEvent.start_time, location: this.fetchedEvent.location, price: this.fetchedEvent.price, img: ''},
      queryParamsHandling: 'merge'
    })
  }

  deleteLike(e: Event) {
    let target = e.target as HTMLImageElement
    let par = target.parentElement?.children[0].textContent?.trim() || ''
    this.title = par
    console.log(this.email);
    console.log(this.title);

    if (this.email && this.title) {

      this.likesService.deleteLike(this.email, this.title).subscribe(response => {
        console.log(response);
        location.reload()      
      })
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    let target = event.target as HTMLElement
    if (!target.closest('.open-container') && !target.closest('.openedBox')) {
      this.OpenClicked = false
    }
  }

}
