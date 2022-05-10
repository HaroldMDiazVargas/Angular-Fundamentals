
// We use pipes to format data e.x lowercase, uppercase, number, etc
// we have another pipe calles => Async 
// If we apply Aync pipe to an observable: 
// 1. this pipe is going to subscribe to that observable
// 2. then this pipe gets the latest value
// 3. When there's a new value available from that observable => this Async pipe is going to mark the component for change detection
// 4. Then Angular is going to automacally refresh the component and render the latest data
// 5. Finally => when component is going to be destroy=> this Async pipe will automatically unsubcribe from the subscription to prevent any Memory Leaks

// In app.component.ts
// we can see our courses is array of type any[] => define a new field courses$; => this '$' is a convention to indicate this is an Observable
// So, in the constructor instead of subcribe to the Observable that comes from the list mehod => this.$courses = db.list('/courses'); => so we have an Observable in this class
// Now, we can go to our template => Instead of iterating over courses => we iterate over courses$ and apply the Async pipe
// This means we can simplify the code in our component:
// - we dont need courses array and the subscription
// - we dont need to manually subscribe to this observable 
// - we dont need to implement the OnDestroy interface 
// Much cleaner => In conclusion in our Firebase apps => usyn Aync code to write cleaner code and prevent Memory Leaks 


//app.component.html

<button (click) = "ngOnDestroy()" >Go offline</button>
<ul>
    // <li *ngFor = " let course of courses">
    <li *nFor = "let course of courses$ | aync">
        {{ course.$value }}
    </li>
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
    // courses: any[];
    // subscription;

    constructor(db: AngularFireDatabase){
        this.courses$ = db.list('/courses'); // Observable

        // this.subcription = db.list('/courses')
        //     .subscribe(courses => {
        //         this.courses = courses;
        //         console.log(this.courses); 
        //     });
    }

    // ngOnDestroy(){
    //     this.subscription.unsuscribe();
    // }

}