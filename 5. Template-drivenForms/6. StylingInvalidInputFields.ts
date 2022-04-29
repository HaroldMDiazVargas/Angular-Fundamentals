
// As a best practice highlight invalid input fields
// In console we can see class asociated to input field:
// 1. form-control(bottstrap)
// 2. ng-invalid (given by angular)
// 3. ng-dirty (given by angular)
// 4.ng-touched(given by angular)
// We can use these three last classes to apply styles for invalid input fields



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


// In styles.css

.form-control.ng-touched.ng-invalid{ //All input fields  with => these classes
    border: 2px solid read;
}