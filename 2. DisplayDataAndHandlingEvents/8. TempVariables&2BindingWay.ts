import { Component } from '@angular/core';

// Get the value tight into the input field:
// 1opt-> Use the standard event object
// 2opt-> Angular other way, declare variable in a template 
@Component({
    selector: 'courses',
    template: `
            // 1opt
            <input (keyup.enter)="onKeyUp($event)" />

            // 2opt-Template variable => #variableName to reference input field
            <input #email (keyup.enter)="onKeyUp(email.value)" />
        `
})
export class CoursesComponent {
    onKeyUp($event){
        console.log($event.target);  //Standard event object in DOM=> Has .target property to reference input field value
   }

   onKeyUp(email){
    console.log(email.value);   //Using template variable
   }
}


// However our component should encapsulate: data, behaviour or logic and template html
// Shouldn't pass parameters to our object or class.

@Component({
    selector: 'courses',
    template: `
            // Template variable
            <input #email (keyup.enter)="onKeyUp(email.value)" />

            // No need template variable
            //Use property binding to binding value property to email field. => Only One way
            <input [value]="email" (keyup.enter)="onKeyUp()" />


            // For two-way binding => 
            // 1opt => We can put any expression for value of event binding
            <input [value]="email" (keyup.enter)="email = $event.target.value; onKeyUp()" />

            // 2OPT => Instead of property binding, we use [()] => 2WBinding sintax(Banana in a Box)
            //      =>Instead of value we put ngModel to avoid repeat code(simplify)
            <input [(ngModel)]="email" (keyup.enter)="onKeyUp()" />

             
        `
})
export class CoursesComponent {
    email = "me@example.com";   //Encapsulated DATA
 
   onKeyUp(){                   //No parameters 
    console.log(this.value);   //Encapsulated LOGIC
   }
}


//However if we change input field in DOM and press enter => Binding Direction from Component TO View(DOM)
// We need Two-way binding
// In angular we have special syntax for implmenting TWO-WAY BINDING => Directive called ngModel
// DOM not have ngModul property => Agular adds to the DOM object
// The implementation is encapsulated in the ngModel directive to avoid repeat the code everytime.
// ngModel directive define what of Angular model (core, browser, forms, animations,etc) called.
// By default is not import in apps => Explicitly import ===>

// Go src/app/app.module.ts => 
// on top => import { FormsModule } from 'angular/forms';
// @NgModule Decorator => imports array:[FormsModule]

