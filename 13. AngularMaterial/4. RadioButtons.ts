// Radio button is very similar to our checkbox
// Head over material.angular.io => components => FormControls => Radio button
// Look overview tab => simple example of using the component => <> => to view source the markup need to render this component
// So we cann in the markup => we have 2 elements:
// - <md-radio-group> 
// - <md-radio-button> => Put all these radiobutton inside 1 group => in that group only 1 radio button will be selectable
// We can have of coure multiple radiogroups in our web page
// Remember to import in app.module.ts => imports[] => see API tab => MdRadioModule from '@angular/material

// In radiobutton we can have:
// - value="1" or [value]="fieldName"
// - checked ="" or [checked]="fielNameBool"

//
<md-radio-group>

    <md-radio-button value="1"  > Male </md-radio-button>

    <md-radio-button value="2" [checked]="isChecked" > Female </md-radio-button>

</md-radio-group>
 
// Now we can see the MdRadioGroup component has a @Input() property called value
//  we can set the value of the group => this will check autom the radiobutton that has that value

<md-radio-group value="2">      //Check automatic the Female radiobutton

    <md-radio-button value="1"  > Male </md-radio-button>

    <md-radio-button value="2" > Female </md-radio-button>

</md-radio-group>