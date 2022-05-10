// Lets take a closer look to feature of real-time

// Firebase database => add new course => Name 4 Value course4 
// When we add new corse => we get a new array of all the courses from the server 
// Evertyme we make a change to the courses node => wheter add or remove or modify => we get the ENTIRE array of courses from the server
// This is because we have subscribed to the courses lists in our database
// In terms of performance => we dont have to worry about this => even we get the entire list => firebase is optimized for these kind of scenearios 
// There's something tricky we have to be aware about :
// Currently we have only 1 component in our app => In real world app we may  have 10 or 100 of components => we are going to ahve routing and navigation
// If we navigate to courses page => we will have a subscription of the courses list in firebase 
// If we navigate away of that page => the subscription is still in memory
// Everytime something happens to the node => we will get the list of courses from database => even user is not on the courses page
// So if we dont manage this suitable => We going to end with Memory Leaks => our app is going to consume more memory than it needs
// To clarify => remember we subscribed to observable returned from the Http class => we didnt have to worry about this
//            => because these observables terminated when we get the response from the server => in these situations we only have 1 response object from the server 
// Here when working with firebase => we dont have 1 response from server  => everytime there's a change in the node which we have subscribed to => we will be notify


// So in our component => when we subscribe to observable => subscription is going to save in memory => we can have Memory Leaks if not manage propertly
// We have seen OnInit and OnDestroy interfaces Lycycle Hooks 
// In a multiple app where user navigate from one page to another => when user navigates away from a component => Angular is going to destroy component => initilize other and put on DOM
// So in our component => we need to handle the onDestroy interface => and there we need to explicitly unsubcribe from the subscription
//                     => implements OnDestroy interface => remember we need to add a method called ngOnDestroy(){}
//                     => In the method created => we need to unsubscribe from the subcription

// Look at the return type of .subscribe method => Subscription Object
// So,  we define a field => subscription => and set to the return value of .subcribe method
// Then in our ngOnDestroy method => we take this field => but we dont have intellisense => typescript doesnt have type of this object => assume like any
// So we anotate subscription field => subscription: Subcription; => this class is defined in rxjs library just like Observable
// now when we this.subscription. => we have  unsubcribe() method
// So when we navigate away from this component => it will be destroy and at same time unsubcribe from this subcription
// To simulate this scenario => put a button or add app with multiple pages
//                           => in button => (click) = "ngOnDestroy()" => after we go offline we gont longer notify of any changes in node courses

// Remember when working with firebase => unsubcribe to  our observables
// 

//app.component.html

<button (click) = "ngOnDestroy()" >Go offline</button>
<ul>
    <li *ngFor = " let course of courses">
        {{ course.$value }}
</ul>



// app.component.ts

import { Subcription }  from 'rxjs/Subscription'
import { Component, OnDestroy } from '@angular/core'; 
import { AngularFireDatabase } from '@angular/fire2/database'

@Component({
selector: 'app-route', 
template: './app.component.html',
styleUrls: ['./app.component.css']
                
}) 
export class AppComponent implements OnDestroy{
    courses: any[];
    subscription;

    constructor(db: AngularFireDatabase){
        this.subcription = db.list('/courses')
            .subscribe(courses => {
                this.courses = courses;
                console.log(this.courses); 
            });
    }

    ngOnDestroy(){
        this.subscription.unsuscribe();
    }

}