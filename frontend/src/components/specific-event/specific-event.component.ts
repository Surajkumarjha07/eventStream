import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventCardComponent } from '../event-card/event-card.component';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-specific-event',
  standalone: true,
  imports: [EventCardComponent, RouterModule],
  templateUrl: './specific-event.component.html',
  styleUrl: './specific-event.component.css'
})
export class SpecificEventComponent implements OnInit {

  constructor(private eventServices: EventsService, private router: ActivatedRoute) { }
  fetchedEvents: any | null = []
  category: string | null = ''
  currentImg: string | null = ''
  currentPar: string | null = ''
  currentSlo: string | null = ''
  currentDivCol: string | null = ''
  currentTextCol: string | null = ''

  ImgArray: any | null = ['https://d1ljk4x3je7yy3.cloudfront.net/images/music-venues.original.jpg', 'https://d1ljk4x3je7yy3.cloudfront.net/images/corporate-events.original.jpg', 'https://images.bzyjr9ji.ext.evbdomains.com/images/virtual-events.original.webp', 'https://d1ljk4x3je7yy3.cloudfront.net/images/download.original.png', 'https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2024/LOCE/performing-arts/header.jpg', 'https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/loce/create-workshop/a-create-workshop--eventbrite--000.jpg', 'https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/2023/loce/retail-events/header.jpg', 'https://images.bzyjr9ji.ext.evbdomains.com/images/a-eventbrite__npo-header-c.original.webp', 'https://eventbrite-s3.s3.amazonaws.com/marketing/landingpages/assets/festival-tickets--platform-001.jpeg']

  ParagraphArr: any | null = ['Sell concert tickets on the most powerful events platform', 'Grow your corporate events with confidence', 'Host virtual events with the most  powerful onlline platform', 'Food and Drink Event Ticketing to Delight Your Guests', 'Showcase your performance to the world with confidence', 'Organize a workshop using the leading events management platform', 'Grow your retail business with unique event experiences', 'Nonprofits Do More with EventStream', 'Sell festival tickets on the leading events platform']

  sloganArr: any | null = ['Join the greatest music events from all over the world with us', 'Ease your events in corporate by picking the best platform', 'Create a virtual event with ease in our platform', 'Get your friends at a party in your home with eventStream', 'Are you ready to perform your talent to the world', 'Create and invite best minds from the world to your event', 'Attract your retail customers by organizing events and showcase your products to them', 'Help people by organizing Non-Profit events', 'Endorse your fastivals and fairs around the world with eventStream']

  colorArray: any | null = ['bg-indigo-950', 'bg-teal-800', 'bg-yellow-200', 'bg-red-100']

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.category = params['category']
    })
    this.getData(this.category)
    this.currentImgFun()
  }

  getData(category: string | null) {

    this.eventServices.getEventsByCategory(category).subscribe(response => {
      console.log(response);
      this.fetchedEvents = response
    })
  };

  currentImgFun() {
    switch (this.category) {
      case 'Music Event':
        this.currentImg = this.ImgArray[0]
        this.currentPar = this.ParagraphArr[0]
        this.currentSlo = this.sloganArr[0]
        this.currentDivCol = this.colorArray[0]
        this.currentTextCol = 'text-white'
        break;
      case 'Corporate Event':
        this.currentImg = this.ImgArray[1]
        this.currentPar = this.ParagraphArr[1]
        this.currentSlo = this.sloganArr[1]
        this.currentDivCol = this.colorArray[1]
        this.currentTextCol = 'text-white'
        break;
      case 'Online Event':
        this.currentImg = this.ImgArray[2]
        this.currentPar = this.ParagraphArr[2]
        this.currentSlo = this.sloganArr[2]
        this.currentDivCol = this.colorArray[0]
        this.currentTextCol = 'text-white'
        break;
      case 'Food and Beverages Event':
        this.currentImg = this.ImgArray[3]
        this.currentPar = this.ParagraphArr[3]
        this.currentSlo = this.sloganArr[3]
        this.currentDivCol = this.colorArray[0]
        this.currentTextCol = 'text-white'
        break;
      case 'Performing Arts Event':
        this.currentImg = this.ImgArray[4]
        this.currentPar = this.ParagraphArr[4]
        this.currentSlo = this.sloganArr[4]
        this.currentDivCol = this.colorArray[2]
        this.currentTextCol = 'text-indigo-950'
        break;
      case 'Classes and Workshops Event':
        this.currentImg = this.ImgArray[5]
        this.currentPar = this.ParagraphArr[5]
        this.currentSlo = this.sloganArr[5]
        this.currentDivCol = this.colorArray[2]
        this.currentTextCol = 'text-indigo-950'
        break;
      case 'Retail Event':
        this.currentImg = this.ImgArray[6]
        this.currentPar = this.ParagraphArr[6]
        this.currentSlo = this.sloganArr[6]
        this.currentDivCol = this.colorArray[2]
        this.currentTextCol = 'text-indigo-950'
        break;
      case 'Non-Profit Event':
        this.currentImg = this.ImgArray[7]
        this.currentPar = this.ParagraphArr[7]
        this.currentSlo = this.sloganArr[7]
        this.currentDivCol = this.colorArray[3]
        this.currentTextCol = 'text-indigo-950'
        break;
      case 'Festivals and Fairs Event':
        this.currentImg = this.ImgArray[8]
        this.currentPar = this.ParagraphArr[8]
        this.currentSlo = this.sloganArr[8]
        this.currentDivCol = this.colorArray[2]
        this.currentTextCol = 'text-indigo-950'
        break;
    }
  }

}
