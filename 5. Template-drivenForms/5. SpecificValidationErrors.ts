
// In angular we have few built-in validators that are based on standard HTML5 validation attributes

// minlenght ="numberOfCharacters", maxlength="number", pattern="regularExpressionValidationOn"(only is valid entry of pattern)
// With multiple validation attributes is not possible show them alll with just 1 <div> => Specific Validation Errors
// Separated <div> por each validation error(inside <div> with alert)


//1<div>.FirstName is required => *ngIf="templVariable.errors.required" => Property errors(object with key/value) => Check if is the required error
//2<div>. FirstName min 3 characters => *ngIf="templVariable.errors.minlength"
//3<div>. FirstName matvh pattern=> *ngIf="templVariable.errors.pattern"

<form>
    <div class="form-group">                   
        <label for="firstName">First Name</label>            
        <input required minlength="3" maxlength="10" pattern="banana"  ngModel name="firstName" #firstName="ngModel" id="firstName" type="text" class="form-control"/>   
        <div class="alert alert-danger" *ngIf="firstName.touched && !firstName.valid">
            <div *ngIf="firstName.errors.required">First name is required</div>
            <div *ngIf="firstName.errors.minlength">First name shoul be minimun {{ firstName.errors.minlength.requiredLength }} characters </div>
            <div *ngIf="firstName.errors.pattern">First name doesnt match the pattern </div>
        </div>          //Display valid error with bootstrap class
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>


//Content of the errors Object => key/value pairs => minlength(Object) {actualLength:2, requiredLength:3}
// Take advantange to this values and render a dynamically message to user