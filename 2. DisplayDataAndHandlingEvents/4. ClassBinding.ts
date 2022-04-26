import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        // Add classes to an element based on the state of underline component 
        // For this, use class binding => prefix with class. + className = "booleanField"
        <button class="btn btn-primary" [class.active]="isActive">Save</button>
    `
})
export class CoursesComponent {
    isActive = true;  //true the class appear and false the class is gone.

}