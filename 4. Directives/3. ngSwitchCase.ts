// Directive similar to the concept of switch case
// e.x page to display proerties in a map or in a list(select one)
// select one => display or select two => display other info
// Can be replace by ngIF but only if conditions are trufy or falsy


//using boostrap classes
<ul nav nav-pills>
    <li [class.active]="viewMode == map"><a (click)="viewMode=map">Map View</a></li>
    <li [class.active]="viewMode == list"><a (click)="viewMode=list">List View</a></li>
</ul>

//Property binding ngSwitch => Angular add to DOM element
<div [ngSwitch] = "viewMode" >
    <div *ngSwitchCase="'map'">Map View Content</div>
    <div *ngSwitchCase="'list'">List View Content</div>
    <div *ngSwitchDefault>Otherwise</div> //If value of field is something else
</div>


//In app.component
//Define a field to keep tracking the select tag
// Render one of <div> dynamically based on the value of viewMode field


import { Component } from '@angular/core';
@Component({
    selector: 'app-root',
    templateUrl: "app.component.html"
})

export class AppComponent{
    viewMode ='map'; //map or list

}
//Compare the value of the field/property against multiple
//values use ngSwitchCase Directive