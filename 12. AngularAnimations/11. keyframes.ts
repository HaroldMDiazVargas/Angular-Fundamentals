// If we see animate.css library => see ...github/animate.css/
// We have all kind of interesting effects
// Select one effect => e.x bounceOutLeft => first go to right and then quickly goes to the left side screen

// To implemente one effect of this:
// 1st way => Define transition and play with animate and style function => Time consuming and hard => work with all kind of styles to get desired effect
// 2nd way => Use the animate.css library or other code reusable to avoid make from scratch

// In github page of the animate.css library 
// go to source/ folder => find the effect => e.x source/bouncing_exist/ folder => In this folder find the bounceOutLeft.css effect
// To see the implementation in css of this effect
// We can see that => using the @keyframes feature of CSS
// with this keyframes => we can specify multiple frames for an animation=> each frame apply different style
// for this animation => we have 2 keyframes => 1st => 20% of the beggining => opacity:1 and transform element to move 20px to the right side
//                                           => 2nd => end of the animation => opacity:0 and element 2000 px move to the place where it used to be(left)
// A more complex animation have more keyframes => each keyframe differen styles

// So we need to get these keyframes and apply them in our angular animation


// So for the 2nd argument of animate(...,...) function => we can either pass a style object or multiple keyframes
// pass only a style object => is like have only 1 keyframe
// so => animate(..., keyframes) => import this function from angular/animations 
//                               => keyframes([style({})]) => this function takes an array => in this array we have multiple calls of the style function
//                                                        => inthe style({}) we have a bunch of styles. But here we have and ADDITIONAL property => offset
//                   keyframes([style({ offset:.2, AllStyles })])   => offset means the offset of the keyframe (0.2, 0.5, so on) => then we can apply all the styles in this keyframe
//                    ... style({ offset: .2, opacity:1, transform: 'translateX(20px)' })    => this is the 1st keyframe
//                    ... style({             opacity:0, transform: 'translateX(-100%)' })   => this is the 2nd keyframe

// offset => determinates the relative position of the keyframe at the begining of the animation                                                  






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

    // transition(':leave', [
    //   animate('0.5s ease-in', style({transform:'translateX(-100%)'}))  
    //   ])

    transition(':leave', [
      animate('0.5s ease-in', keyframes([
          style({
              offset: .2,
              opacity: 1,
              transform: 'translateX(20px)'
          }),

          style({
              opacity: 0,
              transform: 'translateX(-100%)'
          })
      ]))  
      ])
]);



export let fade = trigger('fade',[ 

    state('void',style({opacity:0})),

    transition(':enter, :leave', [
      animate(2000)  
      ])
]);
