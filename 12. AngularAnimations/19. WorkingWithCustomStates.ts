
// Now in app.component.html 
// comment <todos> element and uncomment <zippy> element

// In zippy.component.html
// In the <div> with class="zippy-body" => is where we render the body of the zippy
// in this element we want to apply an animation trigger => @expandCollapse


// In zippy.componen.ts => to implemente this trigger
// property metada animations:[] => add trigger('expandCollapse', []) => array to all the transitions of th etrigger
// on top => import all the helper functions, so on 

// In this elemetn we used the [hidden] property to hide the body of the zippy => we're not using *ngIf
// So, this <div> doesnt not transition between the void => * default state => is always there 
// But, accurately => only the 1st time page is loaded => transition from void => * 
// But if we click on zippy => to collapse there're no transition from void =>* or *=>void

// So here we need to deal with custom states
// In our trigger('..', []) => we need to define a custom state => name => 'collapsed'
// So when this element is collapsed => we want to the height to be 0
//                                   => and also the overflow property to 'hidden' => this will hide the children of this div 
// Now define another state => 'expanded'
//                          => height depends on the content => more content => taller zippy is going to be => height:'*'  => angular will compute dynamically in runtime
//                          => overflow:'auto' => is not longer hide in this state 

// Finally we need to add transitions
// define 1 transition => when we go from 'collapsed' => to 'expanded' 
// transition('collapsed => expanded', [])  => add the steps => we dont want styles just the animation 
//                            [ animate('300ms ease-out')]
// 
// trigger('expandCollapse', [
//              state('collapsed', style({ height:0, overflow:'hidden'  })),
//              state('expanded', style({ height:'*', overfloe: 'auto' })),
//              transition('collapsed => expanded', [ animate('300ms ease-out')])
// ])


// Now back in template zippy.component.html
// We need to set => value of this trigger using property binding syntax
// So => [@expandCollapse] = "isExpanded ? 'expanded' : 'collapsed' "
// if field isExpanded is true set the state of trigger => expanded => otherwise to collapsed

// Test => the animation is => expand smoothly 300ms ease-out 

// However => when we collapse => we dont have animations 

// Add new transition => from expanded to collapsed => and use ease-in speed
// trigger('expandCollapse', [
//              state('collapsed', style({ height:0, overflow:'hidden'  })),
//              state('expanded', style({ height:'*', overfloe: 'auto' })),
//              transition('collapsed => expanded', [ animate('300ms ease-out')])
//              transition('expanded => collapsed', [ animate('300ms ease-in') ])
// ])

// Test => the animation is workin smae => so , doesnt present animation from expanded to collapsed.
// This is becase we used [hidden] property in <div> => when isExpanded is false => will inmmediately hide the element
// even we defined a transition from expanded to collapsed => but elment becomes hidden inmmedately => we dont see transition
// So delete [hidden] => we dont really need this  => because we are defining in the trigger the style to hide or show in the states

// Now for the collapsed state => another problem => we see that there's a padding applied to this <div> in zippy.css => .zippy-body => 20px padding
//     => this padding should be 0 in the collapsed state => But ONLY TOP and BOTTOM padding 
//                                                        => otherwise => we will see a motion like render from top left corner when is expanded
// Now for the expanded state => the padding should be compute at runtime => this will be 20px => Angular define the ppading from the css file
//      => so use padding: '*'

// trigger('expandCollapse', [
//              state('collapsed', style({ height:0, paddingTop: 0, paddingBottom:0, overflow:'hidden'  })),
//              state('expanded', style({ height:'*', padding: '*',  overflow: 'auto' })),
//              transition('collapsed => expanded', [ animate('300ms ease-out')])
//              transition('expanded => collapsed', [ animate('300ms ease-in') ])
// ])

// Test one more time => It works!

// Now lets make code cleaner
// In transition => we have only the animate() function with only direction param(time) 
//               => so, is going to undo all the previous style applied
// For this reason, we dont need to explicitly set these styles for the expanded state 
// because these stles are computed by default in runtime 

// trigger('expandCollapse', [
//              state('collapsed', style({ height:0, paddingTop: 0, paddingBottom:0, overflow:'hidden'  })),
//              transition('collapsed => expanded', [ animate('300ms ease-out')])
//              transition('expanded => collapsed', [ animate('300ms ease-in') ])
// ])


// Lesson:
// If w want to animate an element wich is always on the view => we need custom states
// We use the property binding syntax to set value => to this animation trigger
// This value or state will determinate what transition will run

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
                overflow:'hidden'})),

            // state('expanded', style({ 
            //     height:'*', 
            //     padding: '*',
            //     overflow:'auto'})),

             transition('collapsed => expanded',[ 
                animate('300ms ease-out')]),

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
