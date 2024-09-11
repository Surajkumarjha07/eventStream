import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpecificEventService } from '../../services/specificEvent/specific-event.service';

@Component({
  selector: 'app-create-event-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.css'
})
export class CreateEventPageComponent {

  loginToken: any = ''
  category: string | null = ''
  
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {
    const localStorage = document.defaultView?.localStorage;
    this.loginToken = localStorage?.getItem('loginToken')
  }

  async navFun(e: Event) {
    let target = e.target as HTMLDivElement
    let innerText = target.innerText
    let replacedStr = innerText.replace('&','and')
    let searchStr = replacedStr.substring(0,(replacedStr.length - 1))
    console.log(searchStr);
    
    this.category = searchStr

    await this.router.navigate(['/specificEvent'], {
      queryParams: {category: this.category},
      queryParamsHandling: 'merge'
    })
  }

  Events = [
    {text: 'Music Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__music.webp'},

    {text: 'Corporate Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__corporate-events.webp'},

    {text: 'Online Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__online-events.webp'},

    {text: 'Food & Beverages Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__food-beverage.webp'},

    {text: 'Performing Arts Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__performing-arts.webp'},

    {text: 'Classes & Workshops Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__classess-workshops.webp'},

    {text: 'Retail Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__retail.webp'},

    {text: 'Non-Profit Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__charity-causes.webp'},
    
    {text: 'Festivals & Fairs Events', img: 'https://images.bzyjr9ji.ext.evbdomains.com/marketing/landingpages/assets/2023/organizer/categories/c-eventbrite--il__festivals-fairs.webp'},
  ]  

}
