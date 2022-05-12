// Note when we click on item to remove => slide animation effect is in constant speed
// In real life => Object dont move with constant speed
// e.x drop ball  un top of building => speed increases gradually or e.x driving car => speed increases gradually

// So, back to slide animation
// lets look the :leave transition =>  1st argument of animate(500, style...) => we pass a number use to time the animation
// If we want to have more control over this timing => use string  => animate('500', style...)
// This string has 3 components:
// 1st. Direction and is required => we can specify 500ms or 0.5s => whatever prefer => animate('0.5s',style...)
// 2nd. Delay is optional => e.x delay animation by 1 second => animate('0.5s 1s', style...)
// 3rd. Easing is optional  => Function that determines the speed of an animation over time
//                          => CSS we have few standards ease => linear(default), ease-in(slow->fast), ease-out(fast-slow), ease-in-out(start slow => end slowly)
//                          => for custom ease => use cubic bezier function => determinates the shape of the curve with four numbers => cubic-bazier.com
// So we use Ease-in function => to move things out of the screen  => Move out
// So we use Ease-out function => to move something inside the view

// So in animate => add ease function => animate('0.5s ease-in', style...) => dont need delay
// To use a cubic-bezier function => animate('0.5s cubic-bezier(..,..,.,..,)', style..)





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
      animate('0.5s ease-in', style({transform:'translateX(-100%)'}))  
      ])
]);



export let fade = trigger('fade',[ 

    state('void',style({opacity:0})),

    transition(':enter, :leave', [
      animate(2000)  
      ])
]);
