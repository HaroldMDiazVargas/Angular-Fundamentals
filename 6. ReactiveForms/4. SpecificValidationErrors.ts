// To add multiples validators =>  In FormControl('', [arrayOfValidators])


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
        Validators.minLength(3) //This call method is not for perfoming just for define argument of validator function
        ]),  
    password: new FormControl('', Validators.required)
});

get username(){
    return this.form.get('username')
}

}