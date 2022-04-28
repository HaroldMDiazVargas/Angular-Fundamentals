// Be able to notify when user clicks on favorite component => raise a custom event
// Raise custom events for our components.
// In app.component.ts define a method to binding with custom event raised in favorite component
import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    template: `app.component.html
  
    `
})

export class AppComponent{
    post = {
        title: 'title',
        isFavorite: true
    }

    onFavoriteChange(){
        console.log("Favorite changed")
    }
}

// In app.component.html(template) we have favorite component 
<favorite [isFavorite] ="post.isFavorite" (change)="onFavoriteChange()"></favorite>  //error can't bind unknown property of 'favorite'


// We declare an Output proerty
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';  //Import Output decorator

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('isFavorte') isSelected: boolean;      
  @Output() change = new EventEmitter();  // Initialize to instance of EventEmitter class   
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isSelected = !this.isSelected;
    this.change.emit; //Use method .emit to raise/publish an event => Notify others that something has happendes
   }
}