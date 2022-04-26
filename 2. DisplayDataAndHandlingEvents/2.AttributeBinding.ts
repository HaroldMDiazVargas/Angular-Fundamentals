import { Component } from '@angular/core';

@Component({
    selector: 'courses',
    template: `
            <img [src]="imageUrl" />               // put propertybetwen [] then binding to a field or property
            <table>
                <td [colspand]="colSpan"></td>      //This property is not a DOM property 
                <td [attr.colspand]="colSpan"></td> //Prefix with attr.(attribute) ->We're targeting the colspan attr of HTML element
            </table>
    `
})
export class CoursesComponent {
    title = "List of courses";
    imageUrl = "http://AnImageUrl.com";
    colsPan = 2; 
}

//DOM is a tree of objects in memory. Brower creates this DOM with HTML or using VainillaJS
//HTML  markup to represent DOM in text.
//Almost(99%) all attributes of HTML have 1to1 mapping to properties of DOM objects
//But there are exceptions: colSpan -> DOM object not have colSpan property.
//There're also properties of DOM without representation if HTML like attribute: e.g [textContent]