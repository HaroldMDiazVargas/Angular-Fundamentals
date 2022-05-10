
// To read one object for Firebase 
// e.x read the course that has id 1

//In app.component.ts
// Previously we use list method of AngularFireDatabase Object 
// This instance/object has another method => called object  => return an Observable
//db.Object(pathOfNodeInOurDatabase) => db.Object('/courses/1') 

// In app.component.html
// Add paragraph element => and render our course object using string interpolation
// Apply Async pipe => And to render a a json object use => json pype
// We can see that our course object has 1 property called $value and is set to course1

// In firebase database => lets add a complex object node (at the same level of courses node)
// => Name authors => click on plus(+)
//      |--- Name 1  => click on plus => each author to be a complex object 
//              |--- Name  name  Value Harold Diaz 
//              |--- Name students  Value 100000
//              |--- Name isPremium Value true

// Lets display this author => create field author$
// We can see author object => has 3 properties
//


//app.component.html

<button (click) = "ngOnDestroy()" >Go offline</button>
<ul>
    // <li *ngFor = " let course of courses">
    <li *nFor = "let course of courses$ | async">
        {{ course.$value }}
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
    courses$;
    course$;
    author$;

    constructor(db: AngularFireDatabase){
        this.courses$ = db.list('/courses'); // Observable
        this.course$ = db.object('/courses/1');
        this.author$ = db.object('/authors/1');
    }


}