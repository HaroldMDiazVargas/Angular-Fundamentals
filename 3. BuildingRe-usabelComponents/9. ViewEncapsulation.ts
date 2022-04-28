// Styles are scoped to this component


//SHADOW DOM => Specification that enables DOM tree an style encapsulation 
// Allow us to apply scoped styles to elements without bleeding out to the outer world.

//ex
//document and query selector method to get a reference to an element in a HTML document
//use innterHTML property to set innet html
// If we have other h1 somewhere else is going to be red => BAD !!
// For this use shadow DOM to scope ***
var el  = document.querySelector('favorite'); 
var root = el.createShadowRoot();  //*** This gives us to root shadow DOM for this element
//el.innerHTML = `                  //*** Replace this for root. => h1 style is now scoped 
root.innerHTML = `
    <style>h1 {color:red}</style>   //Problem=> Style bleeds out of this implementation
    <h1>Hello<h1>
`;
//--------------------------------------------------------------------------------------------

//In our component we have concept => View Encapsulation
//enum ViewEncapsulation has three members:
//1. Emulated => Default value => Angular emulates concept of shadow DOM by attaching additional atributes to our css rules
//2. Native => Angular uses native shadow DOM in the browser instead of generate attribute dynamically(see support browser)
//3. None =>  No gonna have encapsulation => Styles defined here will bleed out this template
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation} from '@angular/core';  

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],  
  encapsulation:ViewEncapsulation // Set to the value of encapsulation enumeration (enum)
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