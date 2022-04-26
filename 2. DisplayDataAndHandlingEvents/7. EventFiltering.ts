import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
            <input (keyup)="onKeyUp($event)" />

            // ***Better way to implement, apply a filter => if pressed enter onKeyUp will call 
            <input (keyup.enter)="onKeyUp()" />
        `
})
export class CoursesComponent {

    onKeyUp($event){
         //Submit a form when user press enter(13)
         if ($event.keyCode === 13) console.log("Enter was pressed"); //Classical way to do this
    }

    onKeyUp(){
        // ***Much cleaner 
        console.log("Enter was pressed"); 
   }

}