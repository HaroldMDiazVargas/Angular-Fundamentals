// Whe we refresh page => our todolist animate with fadeInAnimation
// Now => we want to animate the Heading => perhaps slide down on the top of screen

// In template todos.component.html
// Just like we created a trigger and then applied to the button element => we can do the same por h1 element
// But this approach is a little mezzy => with each trigger we need to define this transition => :enter 
// Also chances are => different mark up => we're gonna have different kind of elements => may a <p> <img> 
// we dont  want to create a separate trigger for each of these 
// So, if all these elements are logic part of 1 thing => 1 component => would be better create 1 trigger => apply this trigger to that component => to that parent as a hall
// then we can animate its childreen independently 


// Implement this :
// Put the markup inside a parent <div>(container/parent)
// To this <div> => apply trigger @todosAnimation => so this is for our todos component or for our todos page 

// Now in our component todos.component.ts
//  In animations property => define a new trigger => called trigger('todosAnimations')
// In this trigger => we should have 1 or more transition:
// :enter transition => when enter the view => we want to animate the heading as well as todo items separately
// to get the heading => we use one of the helper functions called => query() => defined in @angular/animations Module
// transition(':enter',[query()])
// query() => 1st parameter is selector: string => we can use CSS Selectors 'h1' , or '#id' or '.class' or 
//                                              => we also have a bunch of Pseudo-selectors tokens:
//                                                  => ":enter" or ":leave" => when a child enter or leaves this containing
//                                                  => ":animating" => when a child element is animating
//                                                  => "@trigger" => by animation trigger applied on them
//                                                  => "@*" => to get all elements that has an animation trigger 
//                                                  => ":self" => if we want to reference the same element => which is the container 
// query('h1',...)  => 2nd parameter is animation:AnimationMetadata | AnimationMetadata[] => in theory we can pass anything here => but in practice thats not gonna work => desing problem
//                                              => what we pass as 2nd argument is the 1 or more steps that should run when animate this 'selector' when it enters the view
// query('h1', [   
//      style({ transform: 'translateY(-20px)'}),    => move 20px up
//      animate(1000)                                => over 1 second => is going to slay down
//])


// Test:
// Our heading is slay down from the top . BUT our todo item is not longer fadeIn animation when reloading the page
// but if we add new item in todolist => we see the fadeIn animation 
// So, in conclusion => it didnt work the first time we loaded the page => but if we add new item => that item will have an animation
/// FIX THIS PROBLEM 






// ----------------------  todos.component-------------------------------------------------

//markup

<div @todosAnimation>

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

    trigger('todosAnimation',[
      transition(':enter',[
        query('h1',[
          style({ transform:'tranlasteY(-20px)' }),
          animate(2000)
        ])
      ])
    ])



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