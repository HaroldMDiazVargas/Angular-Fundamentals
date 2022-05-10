// Firebase database in real-time is the best feature 
// The data in database is modify => changes are reflected in client side inmedtly

// e.x add new node =>  Name 4 Value course4 => If you see page => course appear automatically
// similary if we delete any node => we see it 

// We didt write any code to implement this => Just subscribe to the a list in firebase 
// Without firebase => a real-time app we will have to write a lot code for it 
// Specially for app that involves multiple users => as user modify data => changes are visible for other user
// e.x real world => chat app will be best => as long as one user send a message the other user will see automatically


//app.component.html

<ul>
<li *ngFor = " let course of courses">
{{ course.$value }}
</ul>



// app.component.ts


import { Component } from '@angular/core'; 
import { AngularFireDatabase } from '@angular/fire2/database'

@Component({
selector: 'app-route', 
template: './app.component.html',
styleUrls: ['./app.component.css']
                                      

}) 
export class AppComponent{
courses: any[];
constructor(db: AngularFireDatabase){
    db.list('/courses')
        .subscribe(courses => {
            this.courses = courses;
            console.log(this.courses); 
        });
}
}