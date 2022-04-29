// Make input field required => use required attribute
// Create <div> to render only if field is valid => *ngIf ="!templateVariable.valid" => valid is property part of Control object

// Show error only if user put focus in the input field and moves away without entering a value:
// *ngIf = "templateVar.touched && !templateVar.valid" 


<form>
    <div class="form-group">                   
        <label for="firstName">First Name</label>            
        <input required ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class="form-control"/>   
        <div class="alert alert-danger" *ngIf="firstName.touched && !firstName.valid"  > First Name is required </div>          //Display valid error with bootstrap class
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>

