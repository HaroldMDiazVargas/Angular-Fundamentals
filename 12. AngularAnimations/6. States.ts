

// In the implementaiton of fadein and fadeout  => we have repeated code => style({opacity:0})
// This is the style of the element in the void state
// To clean this code => we can define this style for the void state
// So in trigger('fade', []) => in the 2nd parameter => we have calls of the transitions of state function
// So call the state function:
// 1rs Parameter => name  => state('void') => here we are gonna work with the void state
// 2nd Parameter => AnimationStyleMetadata => when ever see this kind of "word" drop the Animation and Metadata words => we get => Style => this means style function to get a style object
//              => state('void',style({opacity:0})) => set style of this element in the void state 
// So we dont have to repeat in two places => remove for the repeated places in the transitions functions

// Most of the time we use transition function 
// But dependending what we are implementing => we may use state function to make code cleaner and more maintanable

// In angular.io => when we search for Animations Functions => we will see 2 versions of this function
// e.x look for style => we have 2 instances
// => 1rst => defined in @angular/core package => initially all the animations function were stored in this package
// But starting Angular 4 => moved from this package
// However => for compatibility they let in core package => but deprecated soon
// => 2nd => @angular/animations package 



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

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
      trigger('fade',[ 

          state('void',style({opacity:0})),

          transition('void => *', [
            // style({opacity:0}),
            animate(2000)  
            
      ]),
        transition('* => void', [
            animate(2000)
            // animate(2000, style({opacity:0}))
        ]) 
    ])
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


