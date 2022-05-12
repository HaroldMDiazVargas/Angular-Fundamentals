// These animations we applied to our elements have a couple of Callbacks methods that we can use to see when animation starts and when is done

// In our templage todos.componen.html
// In button element => we can use the event binding syntax => to handle the done and start events of this animation 
// (@todoAnimation.start) => .start is the name of the event  => bind to a method and pass event object
// (@todoAnimation.start) = "animationStarted($event)"
// duplicate this and use the other event => .done:
// (@todoAnimation.done) = "animationDone($event)"

// In todos.component.ts 
// Implement these methods
// animationStated($event){} => just log in console 
//animationDone($event){} => just log in console 

// In console we have 6 messages:
// 1st three => are coming from the animationStarted method 
// last three => come from the animationDone method
 
// Because we ahve 3 todo item => for each item we have an animation start and animation done message
// The event object has a bunch of useful properties:
// element: => gives us access to underline element on which we applied the animation(button)
// fromState: =>  initial state 
// toState: => final state  => null means default state
// phaseName: => can be start and done => 
// totalTime => time which takes the animation
// triggerName => custom trigger name we apply to the animation


// This is just to know when an animation start or finishes => when we are working with something complex
// so just handle the events





// ----------------------  todos.component-------------------------------------------------

//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
       @todoAnimation                                       // Apply the trigger
       (@todoAnimation.start) = "animationStarted($event)"
       (@todoAnimation.done) = "animationDone($event)"
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
    trigger('todoAnimation',[


        transition(':enter',[    
            useAnimation(fadeInAnimation,{
                params:{
                    duration:'500ms'  
                }
            })
        ]),

        
        transition(':leave',[
            style({ backgroundColor:'red' }),
            animate(2000),
            useAnimation(bounceOutLeftAnimation)

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


  animationStarted($event){
      console.log($event);
  }

  animationDone($event){
     console.log($event);
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


export let fadeInAnimation = animation([
    style({opacity:0}),
    // animate(2000)
    animate('{{ duration }} {{ easing }}')
],{
    params:{
        duration:'2s',
        easing:'ease-out'
    }


    }

)

export let bounceOutLeftAnimation = animation(
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

)

export let slide = trigger('slide',[ 

    transition(':enter',[
        style({transform:'translateX(-10px)'}),
        animate(500)
    ])

    // transition(':leave', [
    //   animate('0.5s ease-in', style({transform:'translateX(-100%)'}))  
    //   ])

    transition(':leave', 
        useAnimation(bounceOutLeftAnimation)
      )
]);



export let fade = trigger('fade',[ 

    transition(':enter',[
        useAnimation(fadeInAnimation)
        // style({opacity:0}),
        // animate(2000)
    ])

    transition(':leave',[
        animate(2000, style({opacity:0}))

    ])

    // state('void',style({opacity:0})),

    // transition(':enter, :leave', [
    //   animate(2000)  
    //   ])
]);