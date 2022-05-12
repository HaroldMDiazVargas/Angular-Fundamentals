
// We want to create this slide function like a reusable animation => so lets define in animations.ts module

// export a variable => give a trigger function =>
// In theimplementation(2nd parameter of trigger function) => define transitions
// 1st transition(':enter', []) => define the steps to apply to element when enters in the view
//                              => initially we want to shift element 10 px to left => apply style function to apply styles inmmmediately
//                              => style({transform: 'translateX(-10px)'}) 
//                              => then i want to be animated over 2000 ms to the right side => animate(2000) => here we dont need to put the target position
//                              => only using animate(2000) => angular will undo the previuos styles applied to that element

// In todos.component.html and todos.component.ts
// Lets replace fade to slide
// test  => see the elements slide from the left side of the screen

// 2nd transition(':leave',[]) => when an element leaves the view
//                             => call animate(500,style({transform:'translateX(-100%)'})) 
//                             => this will move the element completely outside of the screen

// Also set => outline property to 0 =>outline:0 => in todos.component.ts for button => to remove blue border chrome render



// ----------------------  todos.component-------------------------------------------------


//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
       @slide                                            // Apply the trigger
      *ngFor="let item of items"
      (click)="removeItem(item)"
      class="list-group-item"
      >{{ item }}</button>
</div> 


// css

button{
    outline:0
}

//typescript

import { Component } from '@angular/core';
import { fade } from './../animations';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
     slide           // fade trigger 
  ]
})
export class TodosComponent {
  items: any[] = [
    'Wash the dishes', 
    'Call the accountant', 
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = ''; 
  }

  removeItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }
}


//---------------------------------zippy component--------------------------------------

// markup

<div class="zippy">
  <div 
    class="zippy-heading"
    [class.expanded]="isExpanded"
    (click)="toggle()">
    {{ title }}
    <span class="glyphicon"
      [ngClass]="{
        'glyphicon-chevron-up': isExpanded,
        'glyphicon-chevron-down': !isExpanded
      }"
    ></span>
  </div>
  <div class="zippy-body" [hidden]="!isExpanded">
    <ng-content></ng-content>
  </div>
</div>

// stylesheet

.zippy { 
    border: 1px solid #ccc;
    border-radius: 2px;
}

.zippy-heading { 
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
}

.zippy-body { 
    padding: 20px;
    overflow: hidden;
}

.expanded { 
    background: #f0f0f0;
}

.glyphicon { 
    float: right;
}


//typescript

import { Component, Input } from '@angular/core';

@Component({
  selector: 'zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css'],
})
export class ZippyComponent  {
  @Input('title') title: string;
  isExpanded: boolean;

  toggle() { 
    this.isExpanded = !this.isExpanded;
  }
}

//  src/app/ animations.ts

import {trigger, transition, state, animate, style} from '@angular/animations'

export let slide = trigger('slide',[ 

    transition(':enter',[
        style({transform:'translateX(-10px)'}),
        animate(500)
    ])



    transition(':leave', [
      animate(500, style({transform:'translateX(-100%)'}))  
      ])
]);



export let fade = trigger('fade',[ 

    state('void',style({opacity:0})),

    transition(':enter, :leave', [
      animate(2000)  
      ])
]);
