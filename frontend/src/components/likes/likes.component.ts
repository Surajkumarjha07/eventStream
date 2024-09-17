import { Component, Inject, OnInit } from '@angular/core';
import { LikesService } from '../../services/likes/likes.service';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.css'
})
export class LikesComponent implements OnInit {

  constructor(private likesService: LikesService, @Inject(DOCUMENT) private document: Document) {}

  fetchedLikes: any | null = []
  title: string = ''
  email: string = ''

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

}
