// Add group of radio buttons

//1. <div> class radio(boottstrap)
//2. <label> > <input>  => hard-code radio button use value="valueNumber"


// <div class"radio">
// <label>
//     <input ngModel type="radio" name="contactMethod" value="1">
//     Email       //value to show
// </label>
// </div>
// <div class"radio">
// <label>
//     <input ngModel type="radio" name="contactMethod" value="2">
//     Phone
// </label>
// </div>


//But if we want to render dynamically based on object retrieved from the server => Use ngFor and [value](property binding)

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

    <div class="form-group">
        <label for="contactMethod">Contact Method</label>
        <select ngModel name="contactMethod" id="contactMethod" class="form-group" >
            <option value=""></option> /
            <option *ngFor = "let method of contactMethods"  [value]="method.id">{{ method.name }}</option>   
        </select>
    </div>

    <div *ngFor="let method of contactMethods" class"radio">
        <label>
            <input ngModel type="radio" name="contactMethod" [value]="method.id">
            {{method.name}}      //value to show
        </label>
    </div>





    <p>
        {{ f.value | json }} // json pipe
    </p>

    <button class="btn btn-primary" [disabled]="!f.valid" ></button>        
</form>
