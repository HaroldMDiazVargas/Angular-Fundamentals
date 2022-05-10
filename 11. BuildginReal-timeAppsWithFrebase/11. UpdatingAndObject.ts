
// Lets add a button in front of each course
// When click it =>  call the update method => pass the course object

// In order to update an object => first we need to get a reference of that object
// So in the constructor => add private keyword to db field=> we want to use this in the update method

// Now in the update method:
// this.db.object() => to get a reference of that object => pass the location of that object 
//                  => this.db.object('/courses/) => then we need to add the ID of that course, so:
//                  => this.db.object('/courses/ + course.$key)  => the return of this object method => return FirebaseObjectObservable
// we havein this FirebaseObjectObservable => remove, set and update methods (additional than the standard observable object)
// We use => .set and .update => for updating an object 
// .set() => this method REPLACES the VALUE  of our object with what we pass => we can pass a primitive value or a complex object
//        => .set(course.$value + 'UPDATED') => pass the title of the course and append UPDATED => Test this passing just a primitive value
//        => .set({}) => pass a complex object:
//                {title: course.$value+ ' UPDATED',  price: 150}   => Test this => We can see title disappear in the page =>
//                                                                  => but in our database => we can see value of the obect instead of a string is a complex object
//                                                                 => The title dissapear because in our {{}} we're rendenring $value or name property => not the title property
// .update() => this method only REPLACE the PROPERTIES we have listed (we pass in the update method)
//           => If the properties exist => they will be updated => Otherwise these properties will be added
//           => .update({}) => where this object is  {title: 'New title',  price: 150, isLive:true} 
//           => So only the title and price properties will be updated
// In real world app => If we're dealing with complex object => e.x user profile with multiple sections and may have different forms to modify these section
//                   => In that case we want to use the .update method => we dont want the value of one form to replace the entire profile of the user
// If we're working with small object => and all properties are going to set together => doesnt matter if we use .set or .update methods 


//app.component.html

<input type="text"
 (keyup.enter)="add(course)"
 #course
>
<ul>
    // <li *ngFor = " let course of courses">
    <li *nFor = "let course of courses$ | async">
        {{ course.$value }}
        <button (click)="update(course)">Update</button>
    </li>
</ul>
<p>
    {{ course | async | json }}
</p>
<p>
    {{ author | async | json }}
</p>




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
    courses$: FirebaseListObservable<any[]>;
    course$;
    author$;

    constructor(private db: AngularFireDatabase){
        this.courses$ = db.list('/courses'); // Observable
        this.course$ = db.object('/courses/1');
        this.author$ = db.object('/authors/1');
    }

    add(course: HTMLInputElement){
        // this.courses$.push(course.value);
        this.courses$.push({
            name: course.value,
            price: 150,
            isLive:true,
            sections: [                      // This is an array of objects
            {title: 'components'},
            {title: 'directives'},
            {title: 'templates'},    
            ]
        });
        course.value = '';

    }

    update(course){
        this.db.object('/courses/' + course.$key)
            .set( {
                title: course.$value+ ' UPDATED',  
                price: 150});

        // this.db.object('/courses/' + course.$key)
        //     .update( {
        //         title: course.$value+ ' UPDATED',  
        //         price: 150, 
        //         isLive:true});

    }


}