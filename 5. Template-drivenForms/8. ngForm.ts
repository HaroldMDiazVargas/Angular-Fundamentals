// Angular by default apply directive in <form> called ngForm => Doc angular.i ngForm
// When Angular find <form> element without attr => [ngNoForm] and [formGroup] apply automatically ngForm directive
// In doc ngForm => Output property (raise custom event)=> ngSubmit => Used in our event binding expression


// Create #temVarib to get reference to ngFor directive => #f="ngForm"


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
        </div>          //Display valid error with bootstrap class
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>




import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent  {
    submit(f){      //submit handler
        console.log(f);

        // Here we can access properies like => f.valid or f.invalid or f.errors. etc => To do something
        // In a real sceneario we can => f.value(JSON object) => Send this object to API on server for persistence
    }

    constructor() { }
}


//NgForm directive => Object with bunch of properties(dirty, prestine, errors, touched, untouched, valid..)
// from property => Instance of FormGroup (Group of Input fields)
// value propery => Object with two propeties => comment: "Comment", firstName:"banana"(Name attr )
// These name attributes in input field determinate the keys of this value Object
// This value object is a JSON representation of the form =>  