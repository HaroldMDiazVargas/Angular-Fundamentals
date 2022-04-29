// More detail about directive ngFor


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

}

//In app.component.html

<ul>
    <li*ngFor="let course of courses">
        {{ course.name }}
    </li>
<ul>

//ngFor directive exports bunch of values that may help built some features
// ex => table an need highlight first row, last row, even rows, or display index next object
// export these values using ngFor directive

//One of exporting value is index => alias to local variable
// ;exportedValue as localVariableName  (SYNTAX)
<ul>
    <li*ngFor="let course of courses; index as i ">
        {{ i }} - {{ course.name }}
    </li>
<ul>

//Find list all exported values => angular.io => ngForOf Directive
// index(number), first(bool), last(bool), even(bool), odd(bool)

<ul>
    <li*ngFor="let course of courses; even as isEven "> //even is boolean
        {{ i }} - {{ course.name }} <span *ngIF="isEven">(EVEN)</span>
    </li>
<ul>