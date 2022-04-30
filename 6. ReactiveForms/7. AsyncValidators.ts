// When we create a FormControl object => ('', Validators.required) => We also can add a third optional value
// (initialValue, 1orMoreValidatorFn, asyncValidator?:AsyncValidaforFn | AsyncValidatorFn[])
// AsyncValidatorFn => Is an interface with the next signature:
// (parameterTypeAbstractControl):(return is Promise of ValidationErrors | null  OR Obsrvable of ValidationErrors | null)
// In other wors => Return a Promise or an Observable
// In jscript => We use Promises an Observables to work with asynchronous operations 
// Observables => Later when look conecting to the server => Just make ValidatorFunction to return a Promise

//<> => This determinates the type of the result of async operation
// Asyncronous operation => Call to the server completes or the timer function completes => result is ValidationErrors | null
// If we have Promise of numbers => The results of async operation will be a number (or if failed get an error)

// : ValidationErrors | null
// : Promise<ValidationErrors | null>

// new Promise() We have 3 arrow functions:
// 1. (value?: T | PromiseLike<T>) => void 
//     -------parameter--------   ----return----  //This 1rst function is the type of resolve

// 2. (reason?: any) => void                      //This 2nd function is the type of reject
//   ---parameter---  --return--

// 3. (resolve, reject)     =>  void
// ---parameters(functions)--  -return--      //This 3rd function is the type of executor => Which is the parameter of the constructor of the Promise class

// resolve parameter is used to return a value to te consumer of this Promise  => resolve(true)
// 
// reject parameter is used in case of failed => reject(ReasonForFailed) 
//                                              ReasonForFailed can be 'message' or complex object with details {}


// new Promise((resolve, reject) => { MoveHereAsyncOperation } );
// When AsyncCompletes => return a value to the consumer of this promise => replace return for resolve()

// ***Finally register in our FormControl Object (username inside form)


// username.validators.ts
import { AbstractControl, ValidationErrors } from '@angular/forms'
export class UsernameValidators{
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null{  //ValidatorFn
        if ((control.value as string).indexOf(' ') >0) 
            return { cannotContainSpace:true };
        return null;
    } 

    static shouldBeUnique(control: AbstractControl) :  Promise<ValidationErrors | null>{ //AsyncValidatorFn
        return new Promise((resolve,reject) =>{

            setTimeout( () => {
    
                if (control.value === 'mosh')  //is mosh ? SHOULD BE AN UNIQUE VALUE
                    resolve ({ shouldBeUnique:true });
                else resolve(null) ;            // Add else keyword => resolve not get out like return
    
            }, 2000);


        });
        
        // return null; 
    }
}



// signup-form.component.html
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
        UsernameValidators.cannotContainSpace       //Custom Validator 

    ], UsernameValidators.shouldBeUnique),         //*** Register AsyncValidors at the 3rd argument
    password: new FormControl('', Validators.required)
});

get username(){
    return this.form.get('username')
}

}
