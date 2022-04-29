// In app.component.ts

import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
   task = {         //Object inside other object
       title: 'Review applications',
       assignee:{
           name: 'John Smith'
       }
   }
   
}

//In template
<span>{{ task.assignee.name }}</span>


//Sometimes when dealing with complex object the value of the property null/undefined
// for a certain period of time(fraction of second)
// Two solutions:
//1rstOpt => ngIf => Render span only if task object has an assignee(trufy)

<span *ngIf="task.asssinee" >{{ task.assignee.name }}</span>


//2ndOpt => Keep span on the DOM but not render the name of assignee if is null
// Use => SAFE TRANSVERSAL OPERATOR
// Like assignee can be null or undefined => Put question mark before .
// Angular ignore assignee. Otherwise render it
// DOM has the <span> but nothing inside it

<span>{{ task.assignee?.name }}</span> // For dealing complex objects




