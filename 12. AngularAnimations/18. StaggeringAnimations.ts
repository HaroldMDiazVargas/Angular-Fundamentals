// Look all the todo items appear together when refresh the page
// Would be nicer if these items appear one after another


// In our todos.component.ts
// query('@todoAnimation', animateChild())                  => this is where we are querying our todo items
// We can wrap this call to the animateChild() function     => inside another function called stagger()
// query('@todoAnimation', stagger(200))                    => 1st argument => we need to pass a timing => pass a number or a string => e.x '200ms' or 200
// query('@todoAnimation', stagger(200, animateChild()))   => 2nd argment => pass the animateChild() call
// With this code => we're going to have 200ms delay between animating each todo item => apps to photogallery


// We dont need to call as 2nd argument => the animateChild() function
// the reason we're doing here => because we have defined the animation of this child element => somewhere else(inside trigger 'todoAnimation')
// If we wouldnt have this trigger => and everything were implementing as part of 1 trigger => then 2nd argument of stagger() function => will include the steps of the animation

// So, delete animateChild() => and call useAnimation() => to reuse one of the existing animations  that here is fadeInAnimation
// query('@todoAnimation', stagger(200, useAnimation(fadeInAnimation)))  => Optionally we could override the default parameters  just we have done 
// Al if we didnt have a reusable animation => instead to call userAnimation() function => we would have the actual steps => [] => with bunch of call to style() and animate() function

// So, lets apply the basic fadeIn and with kind slide effect:
//query('.list-group-item', stagger(200, [                                                  // selector => the class of the button element
//                              style({opacity:0, transform: 'translateX(-20px)'}),
//                              animate(1000)
// ]  ))

// With this implementation is like => we dont have the trigger('todoAnimation') at all 
// everything is implementing as part of 1 trigger('todosAnimation')
// And in this implementetion we dont have a call to animateChild() => because the children => in this case todo items => dont have a separate animation trigger
//                                                                                                                      => so we dont have a herarchy of triggers
//So, we can remove the references @todoAnimation in the <button> element => also the handle event to .start and .done
// And in component.ts => comment the trigger => so we only have a single trigger 

// Test => we can see that refresh the page => head and todo items => parallel, with the correct effects
//      => BUT, when we add a new item in todo list => we dont see any effect 
//      => this is because we animated using this query=> query('.list-group-item'...) WHEN containing :ENTER the view  => so container enter view only once//
//      => ALSO, we need triggr for the :leave state in todolist items => when removing

// So for this reason => we need to have the another trigger => REVERSE all the changes :
// 1. in markup => put again references @todoAnimation in <button>
// 2. in property animation => the trigger('todoAnimation')
// 3. in query() => use selector '@todoAnimation' and remove styles => just use animateChild() to prevent block the child => query('@todoAnimation', stagger(200, animateChild()))

// To recap:
// If we want a implement a curtain/stagger effect => use stagger function => give a delay an add the stepts to animate our elements
// the stagger() function is desgined to be use ONLY INSIDE the query() function 
// if you are queryn the children => and ther're multiple children => then add delay between animating each child 





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
        group([
            query('h1',[
                style({ transform:'tranlasteY(-20px)' }),
                animate(2000)
            ]),
  
            query('@todoAnimation', stagger(
                200,
                animateChild()
            ))
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
