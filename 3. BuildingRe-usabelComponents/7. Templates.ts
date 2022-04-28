
//We've seen two forms using templates in componenet:
// 1.Store template externally(.html) => More than 5-10 lines of code
// 2.template: (property inline) => Small component
//Not mix these approaches 
// With ng-cli always create templateUrl
// In newtwork trafic(DevTool) there isn't request for templates => Bundle along source code => main.bundle.js
//

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';  

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input('isFavorte') isSelected: boolean;      
  @Output('change') click = new EventEmitter();   
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