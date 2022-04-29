//In our app.component
// Simulate the scenaario to get these courses from the server
//When call loadCourses() initialize courses field


<button  (click)="loadCourses()">Load</button>
<ul>
    <li*ngFor="let course of courses">
        {{ course.name }}

    </li>
<ul>



//app.component.ts
//Real app happens automatically when load the page


import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
    courses;


    loadCourses(){
        this.courses = [
            { id:1, name: 'course1' },
            { id:2, name: 'course2' },
            { id:3, name: 'course3' },
        ]
    }

    trackCourse(index,course){ //How angular tracks  course objects
        return course? course.id:undefined;
    }
}

//Everytime click to the Load Button Angular is reconstructing the <ul> => reconstruct the DOM tree
// If are large list or complex mark up => Is better to call the backend to load this object
//How to automatize in angular?
//Every time reload the courses(objec) even has the same content the memory location is different
//Angular tracks object by Identit/Reference in memory => Instead TrackByID
// This way Angular not re-render the DOM tree

//trackBy: MethodInOurClass (just add as a reference)
<button  (click)="loadCourses()">Load</button>
<ul>
    <li*ngFor="let course of courses; trackBy:trackCourse"> //trackByID
        {{ course.name }}

    </li>
<ul>

// If dealing with Simple List => Not worry to perform this => more code => Only if need to
// BUT If dealing with large list/complex markup => Bad performance=>Use trackByID to imrpove


