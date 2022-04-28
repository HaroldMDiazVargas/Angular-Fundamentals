
// app.component is the subscriber of (change) event => where's handling the event/state of component change
import { Component } from '@angular/core';
import { FavoriteChangedEventArgs } from '.../favorite.component.ts'

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

    onFavoriteChange(eventArgs: FavoriteChangedEventArgs){     //Add new argument and display => Best Use Interface
        // console.log("Favorite changed ",isFavorite);
        console.log("Favorite changed ",eventArgs);  
    }
}

//Handling the change event we pass $event(built-in object in angular/standard event DOM object) 
// to event handler in app.component-html => Here with custom component $event will be anything we pass(boolean)
<favorite [isFavorite] ="post.isFavorite" (change)="onFavoriteChange($event)"></favorite>  //error can't bind unknown property of 'favorite'





import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('isFavorte') isSelected: boolean;      
  @Output() change = new EventEmitter();   //change event
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isSelected = !this.isSelected;
    // this.change.emit(this.isSelected); } //Optionally pass some value to be available of all subscribers of this event
    this.change.emit({ newValue: this.isSelected }); //Real app we mayeb have object

  }

  export interface FavoriteChangedEventArgs { //Interface to define the types   
      newValue:boolean;
  }
}