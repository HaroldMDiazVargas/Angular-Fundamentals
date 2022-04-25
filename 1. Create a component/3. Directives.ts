import { Component } from '@angular/core'; 

@Component({
    selector: 'courses', 
    template: `
            <h2>{{ title }}</h2>
            <ul>
                <li *ngFor="let course of courses">
                    {{ course }}
                </li> 
            </ul>
            ` //BackTick                            
    

}) 
export class CoursesComponent{
    title = "List of Courses";
    courses = ["course1", "course2", "course3"];

}

//Directives: Angular building blocks
//Use to manipulate the DOM(add, remove, change class, change style)
//In this case ngFor="Expression" with prefix *(modify structure of DOM)
// Inside StringInterpolation {{ variableIterate }}