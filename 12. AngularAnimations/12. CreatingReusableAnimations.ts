
// What if we want a more customize of animation
// e.x when the page load => instead of slide effect => we want fade effect
// and when click in one item => background turns to red => and the see the slide out effect

// If we go to animations.ts module
// we we see slide trigger => in the leave transition => we see slideout effect with somekind of bouncing
// But here we dont want to apply background => it onyl makes sense in the context of todo items => so make reusable
// Also, in the enter transition => we dont want to apply fading effect => again, we want to reusable

// What we need here => custom trigger for todo items

// In todos.component.html
// change @slide => to something custom like => @todoAnimation

// In todos.component.ts
// animations property  => define a custom trigger
// animations:[ trigger('todoAnimation', [])] => we need to import all these animations functions from angular/animations module
//                                           => ontop => trigger, transition, state, style, keyframes ..
// to implement this trigger we want => 2 transitions:
// 1st transition => when element enters the view
//                => we want a fade animation => but we already have it in our animations.ts module => but it's a entire trigger
//                => we can not use a trigger inside a transition => temporaly duplicate this code and then come back and refactor this
//                => so, implemente fading effect from scratch
//                      => style({ opacity: 0}) and then animate(2000)

// 2nd transition ? when element leaves the view
// In our animations.ts module 
// we defined the bounceOutLeft animation => complicated, couple of keyframes with details => we dont want to duplicate it
// To extract this code => put in somewhere else => and then reuse it in multiple  places:
// copy the entire animate function => look that we are copying the animate function inside the ':leave' transition, not the entire trigger
// now the body of the transition(':leave',[]) is empty
// Define a new variable => bounceOutLeftAnimation => look the naming convention 'Animation' word as subfix 
//                       => set to another function called animation() => this animation function is another helper function from @angular/animations 
//                       => argument of animation() => paste the code => the call of animate function 
//                       => so this animation() function is to create reusable animations 
// So in the 'slide' trigger => the empty transition we left before => transition(':leave',[])  => call useAnimation() => this is another helper function=> give the name of our animation
// so => transition(':leave',[ useAnimation(bounceOutLeftAnimation )])
// We can remove square brakets => we used it before to define all the steps during a transition => here we are using 1 stept => which is a predefine animation
// so => transition(':leave', useAnimation(bounceOutLeftAnimation ))
// 

// 2nd transition => 
// reuse the reusable animation 
// transition(':leave',[ useAnimation(bounceOutLeftAnimation )])
// And also we can apply the red background  => then apply animate(1000) => so over 1 second the red background will be undone
// then our bounceOutLeftAnimation will kick it
// transition(':leave',[ style({ backgroundColor:'red' }), animate(1000), useAnimation(bounceOutLeftAnimation )])

// Lesson:
// If we have a complex animation with multiple steps( keyframes) 
// We want to reuse it in multiple places => we can call animation() function to create reusable animation
// then using the useAnimation()funciton we can call this reuse animation





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
            style({ opacity:0 }),
            animate(2000)
        ])

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

    state('void',style({opacity:0})),

    transition(':enter, :leave', [
      animate(2000)  
      ])
]);
