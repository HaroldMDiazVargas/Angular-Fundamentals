// If future change name of Event => Better use alias to avoid change name if app.component.html
// Even if there's not error if use unexistence event name => DOM expects to raise this event 
// KEEP API of the component STABLE 


import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('isFavorte') isSelected: boolean;      
  @Output('change') click = new EventEmitter();   // Apply alias
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isSelected = !this.isSelected;
        this.click.emit({ newValue: this.isSelected });

  }

  export interface FavoriteChangedEventArgs { 
      newValue:boolean;
  }
}