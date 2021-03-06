// Add an object to Firebase 


// In our app.component.html template:
// Add text box => handle the keyup event with filter .enter => and call the add method add()
// The argument of add() => we want to send a reference of this Input element 
//                       => so create a template variable of input element #course => and pass to the add method => add(course)

// In our app.component.ts:
// Implement add method and pass HTMLInputElement
// In order to add an object to Firebase => we use the Observable courses$ that we defined early
// this.courses$. doesnt have IntelliSense => because type of field is any => so annotate it
// to annotate => look at the return type of db.list() method => return FirebaseListObservable => generic parameters <any[]> => this means every item in this Observable is an any[]
// In other words => everytime this Observable emits a new value => that value is actually an array
//                => we saw in console everytime we add/remove a new course => we got an array 
//
// Now, to annotate => we set => courses$: FirebaseListObservable<any[]> => 
// If we type => this.courses$. => we see additional methods we are not available in the standard Observable defined in rxjs 
//                              => e.x push(), remove(), update(), so on.
// So => lets push new value to this node => this .push() method return a promise
// because the value is not added inmediatly => is going to take a little bit of time
// So, if we want to do something after the data is rated to Firebase => we need to call .then() => pass a callback function
//                                                                    => for now dont use this

// We get an error => because only authenticated user can write/red to Firebase => to temporaly solution => change the .write property in Firebase to true

// Now if we add course4 writing on input element
// In firebase we have a new node => with a strange ID automaticatly generated by Firebase => unique identifier
// Aldo we can see that in that node => we see the value is string "course4"

// Lets pass a complex object:
// name: course.value,
// price: 150,
// isLive:true,
// sections: [                      // This is an array of objects
//    {title: 'components'},
//    {title: 'directives'},
//    {title: 'templates'},    
//]

// Now if we add this new object => we have a blank whitespace in the page 
// And if we see the Firebase database => we see the unique identifier
//                                     => we have all properties
//                                     => when working with arrays => the keys are the indexes of elements in the array => in this case we are working with sections array
// So this is the beauty of NoSQL database
// We can insert => complex JSON object in the database in one go => we dont have tables and relationships

// But why we got a blankk <li> in the page? 
// This is becasuse we are display => {{ course.$value }} => but the value of the last course is a complex Object
// So we dont have a primitive value => so we dont have a .$value property
// So, we should manage our nodes => even they can be inconsistenly in terms of structure => we should have some leve consistent between various nodes under a parent

// However, if we have this case:
// To solve this just add =>  {{ course.$value || course.name }}
// So if we have a $value property display it => otherwise display the name of the course





//app.component.html

<input type="text"
 (keyup.enter)="add(course)"
 #course
>
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
    courses$: FirebaseListObservable<any[]>;
    course$;
    author$;

    constructor(db: AngularFireDatabase){
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


}