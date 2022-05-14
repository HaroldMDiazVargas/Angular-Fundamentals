// Pass data to our dialogs


// In app.component.ts
// openDialog method => when open EditCourse component
//                   => we want to pass the id of the courses
//                   => In open method we pass a 2nd argument => wich is an object
//                   => in this object => we have a property called data => set to any value or any object we want to pass for our dialog  
//                                     => it can be a simple value, a string or a complex object 
//                                     => data: {coursId : 1}  => this is how we pass data to our dialogs

// In edit-course.component.ts
// on the recieving side => we should be able to read this data property we pass to our dialog
// when the dialog service(MdDialog) => open this edit-course component in the dialog => is going to pass our data property in the constructor
// so in the contructor => add parameter lets say data(but can be another value) 
//                      => the type of this parameter should be :any => because we can pass any 
//                      => display data in the console just for this demo

// Test
// ERROR in console => Cant revolve all parameters for EditCourseComponent
//                  => this has to do with dependency injection

//Remember:
// When app starts => Angular is going to compile each component in the component tree
// So, in this case is going to compile the EditCourseComponent
//          => So angular looks at the constructor => looks at all the parameters we have defined in this constructor
//          => and is going to inject all these parameters into this consctructor => dependency injection
///         => So in this case => angular DOESNT KNOW what to INJECT into this construtor => becase :any can be anything
//          => FIX => we need to have a closer look at dependency injection
//          => so if we see the providers[] in app.module.ts => we know there're 2 ways to register dependencies:
//                                                           => 1st way => add the name of the Service in providers[] => short-way of the 2ndway
//                                                           => 2nd way => using provider object => {provide: , useClass:}
//                                                                      => e.x { provide: CourseService, useClass: CourseService}
//                                                                      => tell angular => whenever we have a parameter in a constructor with type CourseService
//                                                                                      => use CourseService class
//        => FIX => we need to provice some kind of dependency in providers:[]
//               => { provide: any?, } => this is so weird => tell angular whenever the type of a parameter of constructor in a class is any
//               => ¿HOW TO SOLVE? => we need to know a new term =>  TOKEN
//                                 => In angular what we have in provide property => is refer to as token => this is what we call an injection token
//                                                                                => e.x { provide: CourseService } => CourseService here is an injection token
//                                 => this injection token determinates the type of the parameter of the constructor class
//                                 => when dealing with non-class parameters => like we have a parameter of type:number, string, interface
//                                                                           => we need to create a Custom Injection Token
//                                                                           => because that type can't be use as a token => it can't not have number, string, any
//                                => So, create a Custom Injection Token for the data parameter of type any in the constructor

// In edit-course.component.ts
// export a constant and calling e.x DIALOG_DATA => this is a constant all the letters uppercase
// set this const => to new InjectionToken() => this class is defined in @angular/core
// So, in the constructor of InjectionToken => we need to pass a string that determinates the name of this token
// export const DIALOG_DATA = new InjectionToken('DIALOG_DATA') => now we have an Injection Token

// In app.module.ts
// Use the custom token in providers[]=> { provide: DIALOG_DATA , useClass: ¿?}
// What should we use for class ? => Here we dont want to deal with a predefined class 
//                                => because we are dealing with an object that is pass at runtime
//                                => So instead of useClass property => useValue => and pass actual object 
//                                => pass an empty object with not properties
//                                => With this we are telling angular => whenever the parameter of a class is mark with the DIALOG_DATA injection token
//                                                                    => pass => empty object as the value of that parameter during dependency injection

// In edit-course.component.ts

// Mark data parameter in the constructor => with our Custom injection token
// So we have a decorator function called => Inject() => define in angular/core
//                                        => as argument pass our custom injection token => constructor(Inject(DIALOG_DATA) data:any)
// 


// Test
// The error is gone 
// in the console => we can see the empty object we defined during dependency injection


// In app.component.ts
// We pass previously => as 2nd argumentof .open =>  data:{courseId:1} => this object
//                    => So what we want now to display this object instead of a blank object(previous test)
// Now in this particular case we dont really have to define a Custom Injection Token
// This is actually define in the MdDialogModule in angular/material


// In edit-course.component.ts
// On the Top => we dont need to define the Custom Injection Token  => const DIALOG_DATA => Remove it
// So in constructor  =>  constructor( @Inject() ) => Inject the injection token defined in the MdDialogModule 
//                                                 => this injection token is MD_DIALOG_DATA => import from angular/material
//                    => constructor( @Inject(MD_DIALOG_DATA) data:any)

// In app.module.ts
// We dont need to register  DIALOG_DATA
// when we import MdDialogModule => will automatically register ALL the dependencies
//                               => in this module => is a provider object that asociated that custom injection token with the predefine object

// Test
// Open the dialog => look ine the console => Object{ courseId: 1 }
//                 => object that we recieve in our dialog

// Lesson:
// We can pass data to our dialog => using 2nd argument of .open method of DialogService
// On the target component => to receive the data => add parameter in the constructor and decorate it with @Inject decorator
//                         => and use MD_DIALOG_DATA as the custom injection token





//markup of app.component
<button 
(click)="openDialog()"
md-raised-button> </button>



// ts of app.component
constructor(private dialog: MdDialog){}

openDialog(){
    this.dialog.open(EditCourseComponent,{
        data:{ courseId:1 }
    })
        .afterClosed()
            .subscribe(result => console.log(result));

}


// markup of edit-course component
<p>
    edit-course works!
</p>
<button md-raised-button md-dialog-close="yes">Yes</button>
<button md-raised-button md-dialog-close="no">No</button>

// ts of edit-course.component

constructor(@Inject(MD_DATA_DIALOG) data:any){
    console.log(data);
}