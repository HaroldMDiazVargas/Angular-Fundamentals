
// Now to apply validation to an input field => Angular has a class called FormControl
// For each input field in our form we need to create an instance of the FormControl class
// An with this Control class we can check => current value stored in our field
//                                            see if input field has been touched/untouched
//                                            see if it's dirty(value's changed)
//                                            see if it's prestine(value not changed)
//                                            see wheter is valid or not => If  not => What are validation errors

// Similar to the FormControl class we have also FormGroup class => Group of controls in a form
// Each form => is essentially a Control Group, because it containes at least 1 control
// All properties of the FormControl class are also available in the FormGroup class as well
// So, we can ask form group if it's valid or not => Return true if all Controls in that Group are valid
// Accesing these properties of FormGroup is easier than iterati all the controls of group and checking the statics

// Two ways to create these Control-Group objects(Instances):
// 1rstOpt => Template-driven forms => Apply some directive in our template => Angular will create these ControlGroup objects for us implicityly(under hood)
// 2ndOpt => =Reactive forms =>Explicitly creating these Control objects => Write code in our component to create new instances of FormControl and FormGroup
// Template-driven forms => Basic validation, good for simple forms, simple validation (Field required, given range) 
// Creating Reactive forms =>  More control over validation logic (Good complex form with complex validation, Unit testable)
