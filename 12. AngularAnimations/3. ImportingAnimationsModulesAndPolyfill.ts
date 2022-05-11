//  In this app we have:
// Simple todo list => we can add new item => and delete existing items by clicking over item
// the zippy component => we're not using it yet 
// Currently we dont have any animation here 

// Animations:
// 1. Import Animations Module into app module => include all code for running animations in browsers
//   app.module.ts => On top ?> import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
//   on imports[] => BrowserAnimationsModule
//   this module is implemented on the top of standard Web Animations API => This standard API is supported only in firefox, chrome and opera
//   To support in other browser => We need to add Polyfill
// 2. Add Web Animation Polyfill
//   Polyffill =>  Is code that allows us to use modern Javascript features in older browsers
//   In src/ folder => we have a file polyfills.ts => On line 40-41 we see line commented:
//                    import 'web-animations-js';  =>  This is for importing web animations polyfill
//                    We see that we manually need to install web-animations-js module
//  In terminal => npm install we-animations-js --save    


// These 2 steps are we need to add animation support to an existing app


// ----------------------  todos.component-------------------------------------------------


//markup
<h1>Todos</h1>

<input #itemInput
  class="form-control"
  (keyup.enter)="addItem(itemInput)">

<div *ngIf="items" class="list-group" >
  <button type="button"
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


