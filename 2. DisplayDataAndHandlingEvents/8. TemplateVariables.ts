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