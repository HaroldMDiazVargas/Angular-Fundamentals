// Add dialog to our app

// In app module
// Import MdDialogModule => inside imports[]

// In app.component html
// Add button => when user click it => open a dialog 
//            => apply md-raised-button directive to the button
//            => (click) => bind to => "openDialog()" 


// In app.component ts
// to open a dialog => first imagine the dialog is for ex => editing a course
//                  => so we need a component for editing a course => we can display the component in router-outlet as a web page
//                                                                 => or we can display the component inside a dialog

// In terminal
// ng g c edit-course => create a new component => EditCourseComponent

// In order to display this component inside the dialog:
// first we need to inject => the MdDialogService in our app.component


// In app.component ts
// add constructor => inject MdDialog object => this is a service defined in the MdDialogModule 
// now in openDialog method => we call this.dialog.open() => as first argument specify the target component
//                                                        => pass EditCourseComponent


// Test 
// when click button => get overlead => the dialog is on left side of the screen
// see console => ERROR => No component FACTORY FOUND for EditCourseComponent 

// The compilation steps happens when angular app starts:
// Angular compiler kicks in => Is going to walk down the tree of our components
//                           => then is going to compile each component in this tree
//                           => this tree starts from index.html => on index.html we have <app-root> component
//                           => Angular compiler is going to look the template for <app-root> => which is our app.component.html
//                           => In app.component.html => we dont have any references to any others component of this app( we dont any any selectors of any component)
//                           => so, the only component in our component tree => is our app.component.ts
//                           => becase EditCourseComponent we created but IS NOT in the component tree
//                           => Angular compiler cannot find, cannot compile it => this is the reason of ERROR
// Also remember 
// When angular compiler compiles a component => For each component Angular generates an ng FACTORY file 

// So, because we are adding this EditCourseComponent dynamically in the DOM => is not hard-coded anywhere in our templates
//                                                                           => it render dynamically(dialog.open)
// To solve problem => we need to REGISTER this component as ENTRY component

// In app.module.ts
// @NgModule decorator => we have properties => declarations[], imports[], providers[], so on
//                     => we can also have another property => called entryComponents:[]
//                     => in this array => we register all the components that are added dynamically

// Test
// Click button => beautiful diaglo => where is show the component EditCourseComponent
// Click to the overlead => dialog dissapiar with an animation


// Add two buttons in the dialog => to close the dialog

// In edit-course component html
// Add buttons => Yes and No
// when user clicks to any of these buttons => we want the dialog to close automatically
//                                          => Look documentation dialog/api => Directives we can see MdDialogClose
//                                          => We can apply this as an attribute to the button element => Selector:button[md-dialog-close]
//                                          => so just apply it in the button => optionally we can set a value 
//                                                                            => this value will result of closing this dialog
//                                          => Look documentation dialog/api => we can see @Input properties of this MdDialogClose directive
//                                          =

// Now in our app.component.ts
// Read the result:
// So, we have that .open() method => return type is an Instance of MdDialogRef<> class
//                                 => it's generic => so, in this case => MdDialogRef<EditCourseComponent> 
//                                 => So in this case => returns => MdDialogRef to EditCourseComponent
//                                 => so this MdDialogRef => we can call .afterClosed() => this method returns an Obervable<any>
//                                 => so we can subscribe to it => we will notifiy when user closes our dialog box => we Read the result
//                                  => .afterClosed().subscribe(result => console.log(result));

// Test
// Open dialog => click yes button => In console we will see yes                              

// Recap:
// Use MdDialog Service to open a dialog  
// Call open method 
// Optionally if we want to notify when dialog is closed => subscribe to the observable that is returned from te .afterClosed method



//markup of app.component
<button 
(click)="openDialog()"
md-raised-button> </button>

// ts of app.component
constructor(private dialog: MdDialog){}

openDialog(){
    this.dialog.open(EditCourseComponent)
        .afterClosed()
            .subscribe(result => console.log(result));

}


// markup of edit-course component
<p>
    edit-course works!
</p>
<button md-raised-button md-dialog-close="yes">Yes</button>
<button md-raised-button md-dialog-close="no">No</button>