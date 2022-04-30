// AsynValidators are useful for validating input field in-place
// Make validations upon submitting the form to the server => e.x log in form

//  On top handle output property of ngForm directive applid to all <form> element => (ngSubmit) event


// In future have separate class call a service => For talking to the server
// Imagine the name of that class is AuthService =>  we will have an object of that class => authService.login(JSON object behind this form)
// JSON object in this case will have two properties => username and password
// When we call this authService.login method => Eventually we will get a value from a server => Most likely a boolean to determinate if user password combination is valid or not

//One of the method has AbstractControl class(parent of FormGroup and FromControl) is => setErrors(validationErrorObject)
// We can set errors at the form level  => this.form.setErrors()
// We can also set errors at individual control level => this.username.setErros()
// validationErrorObject => {keys(errors):value(boolean or complex objet with more details)}

// Finally put <div> just right after <form> => with ngIf only if our form has errors
// If we are dealing with multiple validation errors => Add multiples <div> inside the previous div
// Like the same way we made for individual Control Objects 



// signup-form.component.html
<form [formGroup]="form" (ngSubmit)="login()">                  //Directive formGroup  and (ngSubmit) event
    <div *ngIf="form.errors" class"alert alert-danger">         // Add alert error           
        The Username or password is invalid.            
    </div>
    <div class="form-group">
        <label for="username">Username</label>
        <input 
            formControlName="username"      //directive 
            id="username" 
            type="text" 
            class="form-control">
        <div *nfIf="username.pending" >Checking for uniqueness... </div>
        <div *ngIf="username.touched && username.invalid" class="alert alert-danger">
            <div *ngIf="username.errors.required" >Username is required</div>
            <div *ngIf="username.errors.minlength" >Username should be minimum {{ username.errors.minlength.requiresLength }} characters</div>
            div *ngIf="username.errors.cannotContainSpace" >Username cannot contain space.</div>
            div *ngIf="username.errors.shouldBeUnique" >Username is already taken</div>
            </div>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input 
            formControlName="password"      //directive
            id="password" 
            type="text" 
            class="form-control">
    </div>
    <button class="btn btn-primary" type="submit">Sign Up</button>
</form>




// signup-form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
selector: 'signup-form',
templateUrl: './signup-form.component.html',
styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
form = new Instance FormGroup({
    username: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        UsernameValidators.cannotContainSpace       //Custom Validator 

    ], UsernameValidators.shouldBeUnique),         //*** Register AsyncValidors at the 3rd argument
    password: new FormControl('', Validators.required)
    });

    // login(){
    //     let isValid = authService.login(this.form.value);           //We dont have this authService
    //     if (!isValid){
    //         this.form.setErrors({
    //             invalidLogin:true
    //         })
    //     }

    // }


    login(){
        // let isValid = authService.login(this.form.value);           
        // if (!isValid){
        this.form.setErrors({                               //Always at submit form we get error not matter what.
            invalidLogin:true
        })
        // }

    }



    get username(){
        return this.form.get('username')
    }

}