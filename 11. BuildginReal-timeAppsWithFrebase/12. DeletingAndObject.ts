
// The same steps like updating:
// Add new button => binding a delete method that takes course object
// reference this object in delete method => but use .remove() method

// All these methods of FirebaseObservableObject we have seen, like 
// remove method
// set method
// update method
// push method

// All these methods return a Promise 
// So if we want to do something once the changes are ready to the database:
// takes that return Promise object => .then() => e.x log something on console
//                                  => .then(x => console.log("Deleted"))
// or in case of error catch error  => .catch( error => ... )   // and display a toast notification 

// So with Firebase we can easily implement CRUD operations( Create, Read, Update and Delete)
// Not need to build HTTP Services, not need  a backend, not need NodeJs, or ASP.NET
// Firebase is our backend




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
        <button (click)="delete(course)">Delete</button>
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

    delete(course){
        this.db.object('/courses/' + course.$key)
            .remove()
            .then(x => console.log("DELETED"));
    }

}