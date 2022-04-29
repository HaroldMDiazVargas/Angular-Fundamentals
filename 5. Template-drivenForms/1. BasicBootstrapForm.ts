
// In contact-form.component.html
// Two input fields inside form => 1. First name 2.Comment(better use textarea)


<form>
    <div class="form-group">                    //form-group class required by bootstrap
    <label for="firstName">First Name</label>             //focus label automatically focus input field
        <input id="firstName" type="text" class="form-control"/>    //form-control bootstrap class
    </div>

    <div class="form-group">                    
    <label for="comment">Comment</label>             
        <textarea id="comment" cols="30" rows="10" class="form-control"/>    
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


  constructor() { }




}
