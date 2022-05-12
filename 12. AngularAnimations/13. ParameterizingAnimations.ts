
// So in our custom todoAnimation trigger
// we have duplicaded the implemention of the fade in effect => which is in animations.ts module 
// Refactor this:

// In animations.ts 
// The problem with this implementation => our transition only included a call to animate() function
// So, the previous style which is opacity:0 => is outside this transition => we define as part of state
// the problem is that we can ONLY reuse the content of the transition 
// In other words, when we create a reusable animation using animation() function => we pass only the content of the transition function  => we can not pass the state here
// So we need to change current implementartion => pass the style as part of transition => to create a reusable animation


// 1st => separe the :enter and leave: transtion => now we have 2 transition
// 2nd => put the states need in the fade animation => organize these 2 transitios correctly

// Now with these we can reuse => 
// create new variable => fadeInAnimation => call animation function => pass the content of the ':enter' transition
// create new variable => fadeOutAnimation => call animation function .... :leave function

//In this implemnetation we have hard-coding the direction => 2000 => if someone in our app wants another direction or perhaps and ease function
// We can add parameters to the reusable animations => How works ? :
// First change the direction type => number 2000 to string =>  animate('2s ease-out')
// So instead of 2s => we add interpolation to render duration(name of the parameter) and to speed => also interpoaltion with parameter name easing
// animate('{{ duration }} {{ ease }}' )
// We give default values in case the clinet of the code => doesnt provide these values 
// So as a 2nd argument to the animation() function => we can provide an AnimationOptions Object => note we're reference to the function to make reusable animations
// In angular.io => see documentation of animation function => 
// 1st Argument => steps: can be AnimationMetadata or AnimationMetadata[] => if we have multiple steps
//              => remember when see Animation Metadata drop words => so in theory we can pass the return value of any other function defined in the animations module
//              => But this is actually design problem in the animations module => In OOP we have a concept called =>  Liskov's Substitution Principle
//              => a e.x of violation of this principle:
//              =>                                  AnimationMetadata
//                                           _______________|_____________________
//                                           |              |                     |
//                                         Style           Trigger               Animate 
//            => Angular team has define this herarchy where AnimationMetadata is an interface on the top => and below this we have a bunch of other interfaces that extends this interface
//            => In principle => if a function takes an AnimationMetadata => we should be able to get any of its derivaties
//            => But in this case => we can not pass certain types to the animation() function => we will get a runtime error => this is an example of a bad herarchi design
//2nd Argument => options: AnimationOptions Object ({}) or null 
//             => Look the documentation of AnimationOptions interface => defines a type with 2 fields => delay?: number|string, params?: {[name:string]:any} => both optional
//             => we use params field => 1 or more key/valur pairs to supply any parameters to our reusable animations
//                                    => e.x  animation(1stArg,{ params: { duration: '2s', ease:'ease-out' } })   => so these are the default values => and cosnumer can override them
// 
            
// In todos.component.ts
// in transition(':enter',[]) => useAnimation(fadeInAnimation) => as 2nd argument  we can optionally pass an AnimationOptions Object 
//                           => useAnimation(fadeInAnimation, { params: { duration:'500ms' }})      

// Test => refresh => quick fadeIn effect


// Lesson
// When creating reusable animations using the animation() functions => we can add parameters to the animations using string interpolation
// As 2nd argument => supply th edefault values of these parameters
// Finall, the consumer can override these parameters(optionally)

// ----------------------  todos.component-------------------------------------------------


//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
       @todoAnimation                                       // Apply the trigger
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
