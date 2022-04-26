import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        // Apply in-line style to element dynamically
        //  [style.AnyPropertyOfStyleObjectInDOM] => DOM style object properties(we.schoools.com)
        // [style.AnyPropertyOfStyleObjectInDOM] = "expression"

        <button [style.backgroundColor]= "isActive ? 'blue': 'white' ">Save</button>
    `
})
export class CoursesComponent {
    isActive = true;  //true the class appear and false the class is gone.

}