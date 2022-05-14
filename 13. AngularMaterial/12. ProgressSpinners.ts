// Progress Spinner usefult component

// In app.module
// import MdProgressSpinnerModule => on imports[]

// In html component
// use <md-progress-spinner> => this element has two modes:
//                              - determinate => When we know how long this process is going to take => e.x file upload => we can keep track to the upload process
//                                            => so we can display progress from 0 to 100% => mode = "determinate"
//                                            => we can also add value property to the element => value="20" => means 20%
//                              - indeterminate => When we dont know the progress of an action => e.x when we call an API to server we dont know how long take the response
//                                              => so display spinner until we get the response => e.x when loading a page
//                                              => In this mode, we dont need to set the value property

// Dynamically
// Now simulate the scenario where we can track the progrsss of an action


// In component ts
// define a field to set the progress
// define a field to set timer object
// add a constructor => set timer object => to the call setInterval() function in Jscript
//                   => 1st argument is callback => pass an arrow function and increment the value of the field in this class
//                                               => so here we increment field progress++
//                                               => if progress == 100 => stop this timer => call clearInterval() => pass the timer object as argument
//                  => 2nd argument is delay in miliseconds => e.x 20 => means 20ms
// So, with this code every 20ms => this progress field is going to be incremented until it reached 100
//

// Simulate a call to the backend
// To see display a spinner while waiting for the server to respond 
// In order to call the server => we use a data service  => which is going to be a dependency to the constructor => and in ngOnInit => we call server to get data
// But lets now worry to create a service, use dependency injection and dealing with details 

// Simulate a call to the server 
// define a new method => getCourses() => tecnhically this method should be part of service like the data service 
// in constructor => call the getCourses => to get all courses => here we dont gonna get courses really
// Like we know => a data service return Observable => so in the imaginary getCourses method => return observables
//              => to return an observable => use return Observable.timer(2000) => timer is a factory method that returns inmmediately value after given time
//              => so this simulate a call to the server that will take in this case 2seconds
//              => then in constructor subscribe to these observable => .subscribe( courses => this.courses = courses)
//              => however, like here we dont really gonna get these courses(in real app yes) => so we just change the state of a boolean field
//              => this field isLoading => will be binding to ngIf directive

// Test
// The spinner render => after 2 seconds => disppear


// markup
<md-progress-spinner
//  mode="determinate" 
 mode = "indeterminate"
 *ngIf = "isLoading"
//  [value] = "progress"
//  value="20"
 > 
 </md-progress-spinner>



// ts

// progress = 0;
// timer;

isLoading = false;

constructor(){
    this.isLoading = true;
    this.getCourses()
        .subscribe( x => this.isLoading = false);
        // .subscribe(courses => this.courses = courses);

    // this.timer = setInterval(() =>{
    //     this.progress++;
    //     if(this.progress == 100)
    //         clearInterval(this.timer)
    // },20)
}

getCourse(){
    return Observable.timer(2000);
}