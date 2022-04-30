
// In reactive forms we dont use html attributes for validation => assign validator when creatin FormControl objects
// FormControl(formState?:any, validator?:ValidatorFn | ValidatorFn[])
// formState => Initial value to set to FormControl => '' empty string
// validator => ValidatorFn or array([]) of ValidatorFn => Validators Class defined in @angular/forms
// Validators has static methods => .required,.maxlength,minlegth,pattern and .email

// form field(Object) has a method called .get('nameFormControlObject').property (touched, invalid)
// *ngIf="form.get('username').touched && form.get('usermae').invalid" 

// To clean up noisy code => In component.ts define a property give access to username FormControl object
//*ngIf="username.touched && username.invalid"

<form [formGroup]="form"> //Directive formGroup 
    <div class="form-group">
        <label for="username">Username</label>
        <input 
            formControlName="username"      //directive 
            id="username" 
            type="text" 
            class="form-control">
        <div *ngIf="username.touched && username.invalid" class="alert alert-danger">Username is required</div>
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
        username: new FormControl('',Validators.required),  //username or 'user-name'  : new FormGroup()/FormControl()
        password: new FormControl('', Validators.required)
    });

    get username(){
        return this.form.get('username')
    }

}