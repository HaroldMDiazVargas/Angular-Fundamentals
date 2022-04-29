// Ideally disable button and enable only if form is in a valid state

// Using property binding

<form #f="ngForm" (ngSubmit)="submit(f)">
    <div class="form-group">                   
        <label for="firstName">First Name</label>            
        <input 
        required 
        minlength="3" 
        maxlength="10" 
        pattern="banana"  
        ngModel 
        name="firstName" 
        #firstName="ngModel" 
        id="firstName" 
        type="text" 
        class="form-control"/>   
        <div 
        class="alert alert-danger" 
        *ngIf="firstName.touched && !firstName.valid">
            <div *ngIf="firstName.errors.required">
                First name is required
            </div>
            <div *ngIf="firstName.errors.minlength">
                First name shoul be minimun {{ firstName.errors.minlength.requiredLength }} characters 
            </div>
            <div *ngIf="firstName.errors.pattern">
                First name doesnt match the pattern 
            </div>
        </div>         
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary" [disabled]="!f.valid" ></button>           //Disable property
</form>
