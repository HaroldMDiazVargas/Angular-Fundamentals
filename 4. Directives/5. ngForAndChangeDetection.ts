// How ngFor directive responds to changes of the component state

//in app.component.html
<button  (click)="onAdd()">Add</button>
<ul>
    <li*ngFor="let course of courses">
        {{ course.name }}
        // <button  (click)="onRemove(course)">Remove</button>  Remove Course
        <button  (click)="onChange(course)">Change</button>
    </li>
<ul>

//In our app.component.ts

import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
    courses = [
        { id:1, name: 'course1' },
        { id:2, name: 'course2' },
        { id:3, name: 'course3' },
    ]

    onAdd(){
        this.courses.push({id:4,name:'course4'})
    }
    
    onRemove(course){
        let index =this.courses.indexOf(course);
        this.courses.splice(index,1);
    }

    onChange(course){
        course.name = 'UPDATED'
    }

}

//Angular has Change Detection mechanization
//Whenever: 
//1.DOM Events(e.g click a button)
//2.AJAX Requests
//3.Timer function completes
//Know the course object has new object => Render using template(ngFor)