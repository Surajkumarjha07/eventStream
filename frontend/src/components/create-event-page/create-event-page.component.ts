import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-event-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.css'
})
export class CreateEventPageComponent {
  loginToken: any = ''

  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;
    this.loginToken = localStorage?.getItem('loginToken')
  }


  Events = [
    {text: 'Music Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__music.webp'},

    {text: 'Corporate Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__corporate-events.webp'},

    {text: 'Online Event', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__online-events.webp'},

    {text: 'Food & Beverage Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__food-beverage.webp'},

    {text: 'Performing Arts Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__performing-arts.webp'},

    {text: 'Classes & Workshops Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__classess-workshops.webp'},

    {text: 'Retail Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__retail.webp'},

    {text: 'Non-Profit Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__charity-causes.webp'},
    
    {text: 'Festivals & Fairs Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__festivals-fairs.webp'},
  ]

}
