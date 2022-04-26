
// Handle events raised from the DOM like ->mouse mov, clicks, so on.
// ***Sometime we need to get access to the EVENT object that was raised in the EVENTHANDLER => e.g mouse movment EVENT object tell us x,y mouse pos.
// $event represent DOMevent

import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
        // () instead of [] => (NameOfEventHandler) = "metaOfTheComponent"
        <button (click)="onSave()">Save</button>  //Here not get access to the event
        <button (click)="onSave($event)">Save</button>  //***Pass here to get access
    `
})
export class CoursesComponent {
    onSave($event){  // ***Add as parameter to get access to the EVENT object
        console.log("Button was clicked",$event);
    } 

}

// All DOMevents built on the DOM tree unless a handler along the away prevents further BUBBLING 
// This is the standard Event propagation mechanism in DOM, is not specific about Angular
// Event bubbles up the DOM tree.


import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
    <div (click)="onDivClicked()">  //Container div with a handler => click event binding in a different method
        <button (click)="onSave($event)">Save</button>  //***Pass here to get access
    </div>
        `
})
export class CoursesComponent {
    onDivClicked(){
        console.log("Div was clicked"); //Different message
    }

    onSave($event){
        console.log("Button was clicked",$event);
    } 


}

// In console we got two messages when click button: Event bubbling
// Stop event bubbling  just put inside method: $$$ event.stopPropagation();
// Event will not bubbling up => not hit the second handler

import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
    <div (click)="onDivClicked()">  //Container div with a handler => click event binding in a different method
        <button (click)="onSave($event)">Save</button>  //***Pass here to get access
    </div>
        `
})
export class CoursesComponent {
    onDivClicked(){
        console.log("Div was clicked"); //Different message
    }

    onSave($event){
        $event.stopPropagation();  // $$$ STOP BUBBLING UP
        console.log("Button was clicked",$event);
    } 


}
