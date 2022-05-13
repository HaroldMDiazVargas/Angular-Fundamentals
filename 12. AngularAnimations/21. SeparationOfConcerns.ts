
// However we have a problem in the implemetentation 
// We have made a lot to implement this animation in zippy component => that is distracting us from the component implementation
// We have to scroll down => is extra noisy

// In the zippy.component.ts 
// Our focus should be on the component => not the animation 
// To main this code more maintainable => extract all animation code => put in separate file

// So in src/app/zippy folder => add new file => zippy.component.animations.ts
// So in the animations array in metada of our component => we define a trigger  => return a AnimationTriggerMetadataObject
// Extract this trigger and put in new file created and On top import all the helper funcitons in @angular/animations module 
// Finally export as const => give a name => expandCollapse

// So in zippy.component.ts
//  animations:[expandCollapse]  => remember import on top

// Our component is cleaern, no import about animations module, component metadata is not polluted with noise => easily focus onthe ocmponent implementation
// Even in th component metadata we have 4 lines of code => template, style, selector and animations => it could be better=> look updates in Angular team if improve this
//




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
  animations: [ expandCollapse ]



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
  <div class="zippy-body" 
  [@expandCollapse] = "isExpanded ? 'expanded' : 'collapsed' ">
//   [hidden]="!isExpanded">
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
  animations:[
      trigger('expandCollapse', [
             state('collapsed', style({ 
                height:0, 
                paddingTop: 0, 
                paddingBottom:0,
                opacity:0})),
                // overflow:'hidden'})),

            // state('expanded', style({ 
            //     height:'*', 
            //     padding: '*',
            //     overflow:'auto'})),

             transition('collapsed => expanded',[ 
                animate('300ms ease-out', style({
                    height: '*',
                    paddingTop: '*',
                    paddingBottom:'*'
                })),
                
                animate('1s', style({
                    opacity:1
                }))
            ]),

             transition('expanded => collapsed', [ 
                animate('300ms ease-in') ])
    ])
  ]
})
export class ZippyComponent  {
  @Input('title') title: string;
  isExpanded: boolean;

  toggle() { 
    this.isExpanded = !this.isExpanded;
  }
}



//------------- src/app/ zippy.component.animations.ts ----------------------

import { trigger, transition, state, animate, style, keyframes useAnimation,,....} from '@angular/animations'

export const expandCollapse = trigger('todosAnimation',[
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





//--------------------  src/app/ animations.ts-------------------------------

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