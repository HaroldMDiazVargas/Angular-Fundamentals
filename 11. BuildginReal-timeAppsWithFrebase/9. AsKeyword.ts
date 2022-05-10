
// Let's say we want to display the profile of an author
// So we want to display all attributes of the author
// In order to access to properties of the authors object => rap into parenthesis and then access the name property => {{ (author$ | async).name }}
// - <li> => display the name of the author
// - <li> => display the number of students
// - <li> => display isPremium property

// However => this code is ugly => so much repetition of this expression 
// In angular4 we have => As keyworkd=> we have saw in ngFor 

// As keyword:
// To the <ul> element apply ngIf directive => and unrap this author Observable => we have an author object  => *ngIf = "author$ | async"
// So with as keyword => we give an alias => lets say the alias is author  => so =>  *ngIf = "author$ | async as author"
// And then to access the property just => author.name or author.students, so on 

// In conclusion
// If we use the async pipe in multiple places => use as keyword to simplify expressions




//app.component.html


// Without as keyword
<ul>
    <li>{{ (author$ | async).name }}</li>
    <li>{{ (author$ | async).students}}</li>
    <li>{{ (author$ | async).isPremium }}</li>

</ul>

//With as keyword 
<ul *ngIf = "author$ | async as author">
    <li>{{ author.name }}</li>
    <li>{{ author.students}}</li>
    <li>{{ author.isPremium }}</li>

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
    courses$;
    course$;
    author$;

    constructor(db: AngularFireDatabase){
        this.courses$ = db.list('/courses'); // Observable
        this.course$ = db.object('/courses/1');
        this.author$ = db.object('/authors/1');
    }


}