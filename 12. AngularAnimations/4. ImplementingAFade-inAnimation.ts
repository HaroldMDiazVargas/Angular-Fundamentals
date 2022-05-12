// In todos.component.ts

// In metadata => animations property 
// set this property to an array => to define 1 or more triggers
//                               => call the trigger() function => we have a couple of options to import this function => use import from @angular/animations
//                                                              => one is for import from @angular/animations, the other is from @angular/core 
//                                                              => Initially the animations function was part of Core Angular Module => But in Angular 4-4.1 => move this to Angular Animations Module
//                              =>  Give trigger a name and second argument pass an array to register all the states and transitions that implements this animation
//                              => trigger('fade', []) => We often have calls to 2 functions => state() and transition() => it's easier to start with transition() function
//                              => trigger('fade',[ transition() ]) => transition() requires 2 arguments :
//                              => ... transition('void => *')      => 1rst. String called StateChangeExpression => Define the src at the target state
//                                                                          => When our element goes from the Void state to the Default state => then => apply the transition steps
//                              => ... transition('void => *',[])   => 2nd. Array to define steps should run during this animation 
//                                                                          In order to apply fade effect => we should apply certain styles during this transition when element is created but not placed in DOM yet
//                                                                          Here we often have calls to 2 function => style() and animate()  
//                  style({backgroundColor:'yellow', opacity:0}),            => style({}) => takes an object which contains 1 or more key/value pairs => where keys are CSS properties    
//                                                                                       => this style function will appply these styles inmediatly during this transition                                                     
//             animate(2000,style({backgroundColor:'white', opacity:1}))    => animate() takes 2 args => 1st is the timing in ms, 2nd is the style Object
//                                                                                => this animate function will apply these styles over this period of time 
//                                                                                => only difference between styles() and animate() function is the time to apply styles


// To make this cleaner:
// When we call the animate function => we can delete the 2nd argument (style Object)
// We dont have to explicitly tells to Angular to change backgroundColor to white and opacity to 1
// because Angular is smart enought to know => in target state => which is '*' the default state in this transition function => our item should have a white background with opacity 1
//  => animate(2000)
// So, in the list of steps in the transition:
// If we have call of animate() with only a timing value without any style
// this animate()function will undo all the previously styles applied over this period of time                                  
// So, because early we changed the style of our todo item => this anime function is going to make all necessary changes to undo these styles                             
// Finally => for the fade effect we dont really need the backgroundColor
//         => style({opacity:0})  
 

// In todos.component.html:
// Apply the trigger to see the animation
// We can see that each todo item is a button with *ngFor directive 
//  => Apply the trigger  using notation => @triggerName => @fade


// Recap:
// When an element transition from the void state => to the default(*) state
// initially opacity => to 0 => make the element invisible
// And in the period time defined => change opacitiy to 1 => make element appear on the view





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
          transition('void => *', [
            style({opacity:0}),
            animate(2000)  
            
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


