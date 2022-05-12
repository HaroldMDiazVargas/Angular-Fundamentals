
//  Chances we may apply the fade effect in another element somewhere in our app
// We dont want to repeat => better to extract and put it into a different module => to reuse in different places


// src/app => add new file => animations.ts =>  In this place we're gonna define our reusable animations
// If we have a lot of animations => Instead of 1 file => we want to create a Directive and in that directive have different files with kinds of animations


// So in our todos.component.ts
// If we look the type of trigger function => returns AnimationTriggerMetadata => drop words Animation and metadata => return a Trigger object 
// All we have to do  is export a trigger object => from our animations module
// Select all code => copy 


// In our new file(new module) :
// export a variable => export let fade= => set it to the return value of the trigger function( paste the code )
// Finally we need to import all this functions from angular/animations package => on top import { trigger, transition, state, animate, style} from ...

// Now we can reuse the fade trigger in all our components

// So in our todos.component.ts
// in animations: metadata => animations :[] => inside this array just put fade => and import on top 








// ----------------------  todos.component-------------------------------------------------


//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
       @fade                                            // Apply the trigger
      *ngFor="let item of items"
      (click)="removeItem(item)"
      class="list-group-item"
      >{{ item }}</button>
</div> 



//typescript

import { Component } from '@angular/core';
import { fade } from './../animations';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
     fade           // fade trigger 
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

export let fade = trigger('fade',[ 

    state('void',style({opacity:0})),

    transition(':enter, :leave', [
      animate(2000)  
      ])
]);
