// Reactive forms

// Benefits:
// More control over form structure
// More control over form behavior
// Dynamic forms based some data get server
// Easier to unit test


// sugnup-form.component.html
<form>
    <div class="form-group">
        <label for="username">Username</label>
        <input 
            id="username" 
            type="text" 
            class="form-control">
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input 
            id="password" 
            type="text" 
            class="form-control">
    </div>
    <button class="btn btn-primary" type="submit">Sign Up</button>
</form>


// sugnup-form.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
}
