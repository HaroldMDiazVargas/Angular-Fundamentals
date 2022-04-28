// In favorite.component.ts mark field isFavorite as InputProperty => To use in binding property expressions
//Two ways to mark field as inputs property:
//1stOpt => Decorator Input
// Now in our page the component is initialized to fill => in app.component.ts we defined isFavorite as true

import { Component, OnInit, Input } from '@angular/core'; //Decorator Input

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input() isFavorite: boolean;           //Assing Input decorator => Now field is exposed to outside
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isFavorite = !this.isFavorite;
   }
}


//2ndOpt => Declarate field as input property in the Component Meta Data
// Cleaner way but the used of magic string
//BUT if tomorrow change the nameOfField => Update all occurences => Broken
// Underhood it creates a field => isFavorite:boolean => NOT Use this apporach

import { Component, OnInit} from '@angular/core'; 

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css'],
  inputs: ['isFavorite'] //Array of string, Define all fields and properties should be input properties
})
export class FavoriteComponent implements OnInit {
  isFavorite: boolean;         
  constructor() {

   }
   
   ngOnInit(): void {
  }
  
  clicked(){
    this.isFavorite = !this.isFavorite;
   }
}
