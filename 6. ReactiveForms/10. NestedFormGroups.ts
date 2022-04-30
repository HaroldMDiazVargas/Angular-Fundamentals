
// Simple form with  1Group > 2Controls inside
// Large complex app may have form with multiples subgroups

// Lets suppose username and password FormControl objects are part of larger form => Subgroup called account
// Subgroup account is a FormGroup object 

// Now username is not longer root Control => Now is part of Group called account
// We have in angular other directive calle formGroupName => Add <div> and inside put Controls

// signup-form.component.html

<form [formGroup]="form"> 

    <div formGroupName="account">               //Directive 
    
        <div class="form-group">
            <label for="username">Username</label>
            <input 
                formControlName="username"     
                id="username" 
                type="text" 
                class="form-control">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input 
                formControlName="password"     
                id="password" 
                type="text" 
                class="form-control">
        </div>
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
    account: new FormGroup({
        username: new FormControl(''),        
        password: new FormControl('')

    })

});

get username(){
    // return this.form.get('username')
    return this.form.get('account.username')
}

}
