// All about the input fields => apply also to Text Areas elements

// So inside the container <md-input-container> => we have native <textarea> element with mdInput directive applied
// Now look 1 more directive interesting:
// In inpu => APU => documentation => list of directives => we see => [mdTextareaAutosize] => we can apply this directive to textarea
//                                                                                         => will automatly resize textarea to fit its content

// In the old days => we had to use vainillaJs or jquery

// markup

// traditional native textarea

<textarea rows = "2"> </textarea> 



// Material desing look an feel

<md-input-container>
    <textarea mdInput mdTextareaAutosize rows = "2"> </textarea> 
</md-input-container>
