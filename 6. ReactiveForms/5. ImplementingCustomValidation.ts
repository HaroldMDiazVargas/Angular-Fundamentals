
// Custom Validator Function => angular.io search validatorfn (Interface) define in angular/forms
// ValidatorFn{
//    (c:AbstractControl as Parameter):(return ValidationErros | null)}  => Signature => Type and order of parameters as well as return tp
// We can define this function anywhere in our app but is better to put all validdator functions in single class => Encapsulated


// In sinup-form component folder => Create new file => username.validators.ts  => Or if it's common validator => Create app/common folder

// ValidationsErrors => Rrepresent an object that has 1 or more key(string):value(anything) pairs
// return ValidationError object => { nameOfvalidationError: anything } => anything can be object(supply details to user) otherwise true
// e.x of minLength validator object => { minlength:{ requiredLength:10, actualLength:controld.value.length } }

// In order to access cannotContainSpace outside without instance the class UsernameValidators => Decorate method with static

//In username.validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms'
export class UsernameValidators{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{
        if ((control.value as string).indexOf(' ') >0) //username cannot contain space .ex 'user name'
            return { cannotContainSpace:true };
        return null;
    } 

}


<form [formGroup]="form"> //Directive formGroup 
<div class="form-group">
    <label for="username">Username</label>
    <input 
        formControlName="username"      //directive 
        id="username" 
        type="text" 
        class="form-control">
    <div *ngIf="username.touched && username.invalid" class="alert alert-danger">
        <div *ngIf="username.errors.required" >Username is required</div>
        <div *ngIf="username.errors.minlength" >Username should be minimum {{ username.errors.minlength.requiresLength }} characters</div>
        div *ngIf="username.errors.cannotContainSpace" >Username cannot contain space.</div>
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


// sugnup-form.component.ts
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
        UsernameValidators.cannotContainSpace               //Custom Validator 
    ]),  
    password: new FormControl('', Validators.required)
});

get username(){
    return this.form.get('username')
}

}