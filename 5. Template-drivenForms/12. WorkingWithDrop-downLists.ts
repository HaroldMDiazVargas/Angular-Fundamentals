// Add drop-down list to form

// 1. <div> class form-group(bootstrap)
// 2. <label> then a <select>
// 3.

// Most real apps we dont hard code these <option> here => We call API on server to get list e.g content methods 
// then pop this drop down list dynamically 



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
            <option value=""></option> // Blank option to avoid contactMethod in value object has a value for contactMethod.
            <option *ngFor = "let method of contactMethods"  [value]="method.id">{{ method.name }}</option>   
        </select>
    </div>


    <p>
        {{ f.value | json }} // json pipe
    </p>

    <button class="btn btn-primary" [disabled]="!f.valid" ></button>           //Disable property
</form>



// component.ts

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent  {
    contactMethods = [
        { id:1, name: 'Email'}, // id => send to server for persistence(saved in value object) , name=> show to user
        { id:2, name: 'Phone'},

    ]

    constructor() { }
}

// In most apps we want to send only  value  of "1"(id) to serve. But sometimes we want to set value of contact method property(in value object)
// to actual contact method object (Object with two properties(id and name))

//In value object we have {"firstName": "",
//                         "comment": "",
//                         "isSubscribed": "",
//                         "contactMethods":"1"}

//Instead of using [value]="method.id" we use [ngValue]="method"
// value attribute only can be a STRING in html => cannot store an actual contactMethod object
// ngValue is an attribute Directive => Exposes the ngValue property 

//In value object we have {"firstName": "",
//                         "comment": "",
//                         "isSubscribed": "",
//                         "contactMethods":{"id"=1, "name":"Email"}}  => In most apps not used

// Finally if use multiple attribute in <select> => Interface change in page and can select multiple options
// "contactMethods":[1,2]}  => Array of integers 