// Times where u want to show/high part of pages depending some conditions
// our app component

import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
    courses = [1,2];
}


//Now render in list courses in app.html otherwise message there is not courses
//Display one div or another dependig courses field
//Simplify use div but => real app use ngFor with ul/li
<div *ngIF="courses.length>0 or doWeHaveAnyCourses() ">   //*ngIF ="condition" => If condition is trufy => Render in DOM this div
    List of Courses
</div>
<div *ngIF = "courses.length ===0"> //Trufy => Added to DOM ; Falsy => Removed from DOM
    No courses yet
</div>


//DIRECTIVES
//TYPES=> There're two types of directives:
//1.Structural directives=> Modify structure of DOM by adding or removing DOM elements => Prefix with *
//2.Attribute directives => Modify attributes of DOM elements.
//In this case we want 1. => 

//In Angular 4 we have slightly sintax: 1 DIV +  ng-template => #VariableName define 
<div *ngIF="courses.length>0; else noCourses "> 
    List of Courses
</div>
<ng-template #noCourses> 
    No courses yet
</ng-template>

//Another apporach is: More clear and consistent.  => condition; then #trufy else #falsy => 1 DIV +2ng-template
<div *ngIF="courses.length>0; then coursesList else noCourses "> 
</div>
<ng-template #coursesList> //For display list of courses
    List of Courses
</ng-template> 
<ng-template #noCourses> 
    No courses yet
</ng-template>
