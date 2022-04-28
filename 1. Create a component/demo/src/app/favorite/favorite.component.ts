import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent {
  // isFavorite!:boolean;
  isFavorite = false;


  
  clicked(){
    this.isFavorite = !this.isFavorite;
   }
   
   
   

}
