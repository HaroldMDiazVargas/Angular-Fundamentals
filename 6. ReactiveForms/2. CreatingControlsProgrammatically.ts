// FormControl Objects and FormGroups Objects must be create explictly 

// 1. Import FormGroup and FormControl classes
// 2. Define field(form)  new instance FormGroup(controlsArePartOfTheForm,)

// controlsArePartOfTheForm => 1 or more key:value pairs => {key(string):value(Instance of class derivates of abstract control)} 
// Can be FormControl and FormGroup instances => have a based class => AbstractControl(parent/prototype)


// Then we need to associated the form and  input fields with FormGroup and FormControl objects respectively:
// 1. Need to apply directive to form element => [formGroup]="fieldName"
// 2. Apply directive [formControlName]="nameOfKeyInFormGroupObject" => To input fields 

// Note: The formGroup directive(all reactive directives) is defined in the ReactiveFormModule => Need to explicly import in main module(app)
// app.module.ts => imports:[ReactiveFormsModule]

// sugnup-form.component.html
<form [formGroup]="form"> //Directive formGroup 
    <div class="form-group">
        <label for="username">Username</label>
        <input 
            formControlName="username"      //directive 
            id="username" 
            type="text" 
            class="form-control">
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
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
    form = new Instance FormGroup({
        username: new FormControl(),  //username or 'user-name'  : new FormGroup()/FormControl()
        password: new FormControl()
    });

}