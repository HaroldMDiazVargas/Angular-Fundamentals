// 3 ways to Apply styles to our component:
//1rst way use styleUrls property in the component metadata => Array to have 1 or more css files
//2nd way is using style property => Array to often use backtick write in-line style
//3rd by writing in-line in html template(favorite.component.html) use style tag => Not good practice

// The selection of the style is defined by the order => styleUrls, then become style:[]..=> Last applied
// Angular only pick the one come last, completed ignore styles before (exclusion)
// If we add styles in template(html) it will always be override any previously even if are more specific
// The styles in angular has scope => Define a class in other place the style here will not affect.
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],  //1rst opt
  style :[                                  //2nd For small component few styles
      `
      
      `
  ]
})
export class FavoriteComponent {
  @Input('isFavorte') isSelected: boolean;      
  @Output('change') click = new EventEmitter();   

   
  clicked(){
    this.isSelected = !this.isSelected;
        this.click.emit({ newValue: this.isSelected });

  }

  export interface FavoriteChangedEventArgs { 
      newValue:boolean;
  }
}