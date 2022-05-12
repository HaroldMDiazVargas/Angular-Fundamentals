
// We still have a little bit of duplication => repeated animate(2000) in 2 places

// Cleaner way to implement fade in and fade out:
// In the transition function as 1st argument => we can supply multiple state change expressions
// transition('void => *, addOtherStateChangeExpression') => transition('void => *, *=>void',[...])
// So we can delete the 2nd transition 

// But we can make it even cleaner:
// Instead of having 2 unit directional state change expression 
// We can a bidirectional state change expression => delete second expression and make bidirecciontal
// transition('void <=> *',[...])

// So, if we have multiple transitions => and these transitions have the same implementation we can refactoring them into 1 transition with multiple state change expression
// Also, we have a couple of aliasing => the alias of  this expression that is very common=> 'void => *, *=>void' => is:
//  1st expression => when element transition from void to default state => the alias is => enter => ':enter'
// 2nd expression =>  the alias is => leave => :leave
// Using alias is cleaner  => transition(':enter, :leave',[...])





// ----------------------  todos.component-------------------------------------------------


//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
       @fade                                            // Apply the trigger
      *ngFor="let item of items"
      (click)="removeItem(item)"
      class="list-group-item"
      >{{ item }}</button>
</div> 



//typescript

import { Component } from '@angular/core';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
      trigger('fade',[ 

          state('void',style({opacity:0})),

        //   transition('void <=> *', [
          transition(':enter, :leave', [
            // style({opacity:0}),
            animate(2000)  
            
      ])//,
        // transition('* => void', [
        //     animate(2000)
        //     // animate(2000, style({opacity:0}))
        // ]) 
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


