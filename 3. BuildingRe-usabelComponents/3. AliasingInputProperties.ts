// How to give to Input Property an Alias or Nickname
// Because we maybe want to change name like this => isFavorite to is-favorite
// Optional supply string to Input() to set alias 
// Benefit=> Keep contract of component stable => Minimize impact changes if rename the field future
// BUT => we have to remember has the sanem name of field(isFavorite) in the favorite.component.html(2Step)
// BUT Not in other components(use alias instead) like in app.component.html

import { Component, OnInit, Input } from '@angular/core'; 

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('is-favorte') isFavorite: boolean;       //Add alias    
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isFavorite = !this.isFavorite;
   }
}
