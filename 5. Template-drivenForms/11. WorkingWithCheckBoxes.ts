// Add check box to the form

// 1. Using class checkbox of bootstrap in <div>
// 2. Apply ngModel directive in the input field and also give the name attribute(appear in value object)


// value object has  {"firstName": "",
//                     "comment": "",
//                      "isSubscribed": true } //true if check the box or false otherwise

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

    <div class="checkbox">
        <label>
        <input type="checkbox" ngModel name="isSubscribed"> Subscribe to mailing list 
        </label>
    </div>
    <p>
        {{ f.value | json }} // json pipe
    </p>

    <button class="btn btn-primary" [disabled]="!f.valid" ></button>           //Disable property
</form>
