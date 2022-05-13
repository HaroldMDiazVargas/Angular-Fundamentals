// Drop-down list
// In Angular Material website => FormControl => select 
// API tab => find module where this component is seelcted => MdSelectModule => to add in imports[]
// Overview tab => look <> => markup we need => we need 2 elements to render this component:
//                                           => - <md-select> 
//                                           => - <md-option>
// These elements are very similar to the native <select> and <option> in HTML5
// To preselect one of the items in the option list => we need to use ngModel directive 
//     => apply [(ngModel)] in our mg-select => and bind to "fieldName"
//     => remember ngModel directive is defined in the forms Module
//     => So we need to import formsModule => in the imports[]array
// markup

// native drop-downlist
<select>
    <option 
    *ngFor = "let color for colors"
    value="color.id">
    {{ color.name }}
    </option>
</select>

// Angular Material drop-downlist => Just prefix the <select> and <option> elements with md-

<md-select [(ngModel)] ="color">
    <md-option 
    *ngFor = "let color for colors"
    value="color.id">
    {{ color.name }}
    </md-option>
</md-select>



// typescript component

color = 2;
colors= [
    { id:1, name:'Red' },
    { id:2, name:'Green' },
    { id:3, name:'Blue' },

]