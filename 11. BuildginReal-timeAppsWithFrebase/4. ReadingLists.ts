// Like we saw early in NoSQL each node  => can have different structure
// This is powerful because it allows to quickly build our database => without having a schema => increase our productivity
// But also if we dont manage it properlty => we can run into issues

// Read database, in this case courses => and display in a page!
// In app.component.ts => for demostration it can be multiple component
// In the constructor => inject one of the angular firebase classes => first on top import { AngularFireDatabase } from '@angular/fire2/database' => Look is not Module(only imports on app.module)
// Instance of AngularFireDatabase => has a couple of methods:
// -list => For reading a list of objects => 1st argument pass the path to our node in firebase => return FirebaseListObservable => it's like Observable but with additional methods
// -object => For reading 1 object

// db.list('/courses')
// threat like an observable => so subscribe to it
// And we can use to set a field in the class 

// In console we have an error => Client doesnt have permission to access the desired data => By default only authenticate user can read from or write to firebase database
// Let's not worry about authentication 
// So in firebase console => database page => rules tab => Couple of rules for reading and writing data
// these rules are defined as JSON object => the value of the properties are expression => auth !=null => means only user authenticated can read and write data
// lets change these expressions for just true => anyone can read  => PUBLISH to save changes
// In a real world scenario => we may want to open up read access to certain nodes in our database => allow anonymous users to read from these nodes 
//                          => But we can have other nodes that have a barrer of security => e.x only authenticated users, or users with a specific role can read from theses nodes

// Now if we se console => we see an array of 3 objects  [Object, Object, Object]
// Each object has 2 properties =>  $value and $key
// Except our third object doesnt have $value property 
// So if we want to display the name of the courses => difficult => becase title of first 2 courses is on $value property but in 3rd course is stored in title property
// this is why => if we dont manage NoSQL database propertly we are going to run into issues
// So in firebase database delete 3rd Node => and add new node consistent to the others 2 nodes => Name 3 Value 3 
// Now get in markup the field => to display the data in the page 


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