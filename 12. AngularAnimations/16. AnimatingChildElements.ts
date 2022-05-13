
//  To fix problem => when reload page => our todo heading is animated but todo item is not animated

// The reason we have this problem => is because herachy 
// In this herarchy we have => 2 aniamtions triggers 
//  parent trigger => todosAnimation => in <div> element => container or parent
// child trigger => todoAnimation => in button element

// In our todos.component.ts
// Both these triggers handle the :enter transition 
// In this situation => when :enter transition happens => the parent trigger will always get priority => and child WILL BE BLOCK
// So the block code corresponding of the child trigger => will not execute at all

// fix it:
// In the parent trigger just like we query our heading => we need to query our todo items => and allow theis animation to run
// So, after the query of heading => add new query
// query('@todoAnimation', ) => select the element with this animation trigger
// query('@todoAnimation', []) => we already have implemented what should happen to todo items when enter the view 
//                             => to avoid repeat the step => which is in trigger('todoAnimation'[...])
//                             => we tell to Angular to run this animation => so use animateChild() => Helper function 
// query('@todoAnimation',[animateChild()])  =>          so with animateChild() => we're telling angular NOT to BLOCK this animation

// test => heading and todo items animate when refresh the page
//      => pay attention => these animations are run in SEQUENCE => first heading => when done => todo items appear



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
        ]),

        query('@todoAnimation', animateChild()) //Not need brackets for single stept

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