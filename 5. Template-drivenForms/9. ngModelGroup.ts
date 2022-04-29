// Complex forms is better have multiples groups in the form


// Before we had value Object => {comment: "Comment", firstName:"banana"}
// Is desirable to have value Object => comment: "assaf", contact(complex object)
// contact object has => firstName: "harold" => Potentially later we can have lasName, email, etc as keys in this complex object.
// other complex object we may want to have is address Object => shipping, billing, etc.

// We have ngModelGroup Directive =>  Represent the subproperty in our value Object => This directive creates an instance of FormGroup class for that group
// In our app the API we have in server may expect a complete nested object structure like this => Use ngModelGroup
// ngModelGroup = "valueOfngModelGroup"(subproperty in our value object)

// Also using #variableName to reference entire ngModelGroup to validated it => e.x display validation erors on top of billing group

// Value object = { comment: "Comment"
//                 contact: { firstName: "banana"  } }



// Difference between ngForm and ngModelGroup:
// ngForm exposes an output property (ngSubmit) => to handle submit event of forms
// ngModelGroup doesn't have the output propertu => Ilogical to submit part of a form

<form #f="ngForm" (ngSubmit)="submit(f)">
    <div ngModelGroup="contact" #contact="ngModelGroup">                    //Add complex contact object to value
        <div *ngIf="!contact.valid">...</div>       //See if entire group is valid => inside <div> have all validation errors for that group
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
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>