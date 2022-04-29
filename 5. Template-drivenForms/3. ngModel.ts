// Validation usin template-driven apprach

// ngModel directive => Apply to input field
// When apply this directive without any binding, angular will create Cotrol object and associate with input field underhood
// We have to set name attribute in input field.(requires way to distinguish Control Object)
 
// In contact-form.component.html 
<form>
    <div class="form-group">                   
        <label for="firstName">First Name</label>            
        <input ngModel name="firstName" id="firstName" type="text" class="form-control"/>   
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>


// What happen under the hood ?
// Handle (change) event of the input field and call log()method
// To reference the ngModel directive to pass this reference to log method and logging in console => Create template variable
//log(templateVariable)

<form>
    <div class="form-group">                   
        <label for="firstName">First Name</label>            
        <input ngModel name="firstName"  #firstName="ngModel"  (change)="log(firstName)"  id="firstName" type="text" class="form-control"/>   
    </div>

    <div class="form-group">                    
        <label for="comment">Comment</label>             
        <textarea ngModel name="comment" id="comment" cols="30" rows="10" class="form-control"/>    
    </div>
    <button class="btn btn-primary"></button>
</form>


// In contact-form.component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent  {

log(x){console.log(x)}
  constructor() { }
}

// In console we can see control object(Instance of FormControl)
// Inside control obejct => See pairs properties => invalid-valid - errors, touch-untouched, dirty-prestine,
