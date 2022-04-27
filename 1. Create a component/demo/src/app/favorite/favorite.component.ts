import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  isActive = false;
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isActive = !this.isActive;
   }
   
   
   

}
