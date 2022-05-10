
// There's more to Firebase 
// A lot of developers prefer to build the backend using the prefer stack
// In NoSQL => we dont have really the concept of joins that we have in relational databases
//          => Our nodes dont have a relationship of how we have relationship of records in relational databases
//
// Remember the setup of AngularFire into the app.module => maybe change according the new versions.





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