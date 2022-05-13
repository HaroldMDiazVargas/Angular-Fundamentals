// Work with Angular Material Input control

// material.angular.io => FormsControl => Input => API tab => import the module MdInputModule on imports[]
//  overview tab =>  see how input controls of Angular Material looks like
//  Instead of having a label before an input field  => we have a placeholder that moves to top of input field(smaller) if we click and write something
//  in the markup => we have few elements:
//                   -<md-input-container> => container of the native <input> element
//                                         => reason we have a container => in Angular Material , we have few other elements we put all these INSIDE the container
//                                                          => - have a hint(clue) below each input field => <md-hint>
//                                                          => - prefix => using mdPrefix directive
//                                                          => -  subfix => using mdSuffix directive
//                                                          => -  or error messages => <md-error> element 
//                   - <input> => native HTML5 input element
//                             => has a directive called => mdInput
//                               
// To render error => input field required
// with bootstrap class we used => alert alert-danger in a <div>
// here, we use <md-error> => and MAKE SURE not use bootstrap classes => e.x input field we added class ="form-control"
//                                                                    => it will mess the appearence
// 
// Test => it works => when we click to write we see * of red color 
//                  => but we dont see error message if we tab away
//                  => becase we have not applied the ngModel directive to this input field => 
//                  => there is not form control => to keep track of the validity of this input field under the hood
//
// So, apply => ngModel directive to <input>  field and also as requirement we give this <input> field a name => this is when we build template-drive forms
// Now, whith this => Angular will create a form control object => that associated this <input> field 

// Test => focus and then tab away => we see our error message 

// Finally => lets render the error message only if input field has an error
//         => declare a template variable #username => set it to "ngModel" => in the <input> field
//         => with this variable we can see => if our input field has an error or not 
//         =>  use ngIf = "username.invalid && username.errors.required"  => use in <md-error> element
//         => So with this we can have multile errors of different kind => exactly way when we implemented template-drive => Only difference is in markup
//         => instead of using <div> with bootstrap classes => we use Angular Material classes


//markup

<md-input-container>
    <input
     ngModel
     #username = "ngModel"
     name = "username"
     type="text" mdInput placeholder="Username" required>
    <md-hint> Type a unique username </md-hint>
    <span mdSuffix> @domain.com </span>
    <span mdPrefix> admin. </span>
    <md-error *ngIf="username.invalid && username.errors.required" >
        The username field is required
    </md-error>
</md-input-container>

