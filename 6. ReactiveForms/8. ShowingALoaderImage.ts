// While working with AsyncOp => Display a Loader img while AsyncOp is in progress
// Add <div> right after <input> field of username( Has AsyncValidator)
// <div>Message or AddLoaderIcon </div>

// username is a property in our component that references our FormControl Object
// FormControl has a property has a property called pending => Return true if at least 1 AsyncValidator is in progress




// signup-form.component.html
<form [formGroup]="form"> //Directive formGroup 
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
