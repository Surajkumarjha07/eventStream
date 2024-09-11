import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent{

  @ViewChild('divRef') divRef!: ElementRef ;
  
  // ngAfterViewInit(): void {
  //   const divElement = this.divRef.nativeElement;
  //   const height = divElement.offsetHeight;
  //   const width = divElement.offsetWidth;
  //   console.log(height, width);
    
  // }  

}
