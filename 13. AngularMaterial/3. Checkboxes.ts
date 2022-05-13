// Checkbox component in Angular Material
// implments a very similar  API to the native checkbox of HTML5
// e.x in HTML5 in order to add checkbox => we need to add input element with type checkbox, and other attr
//     But our custom checkbox of Angular Material also has all these attributes/properties

// Go to doc => API tab => find all properties implemented in this component
// Under Directives => we can see the name of our component => MdCheckBox
// Below we have a table with the list of all the @Input and @Output properties 
// few key properties we are gonna use in a lot of world real apps:
// value = "2" or we can use property binding => to bind to field in our component => [value] = "..."
// checked = "checked" => checked as default or use property binding => [checked]  "fieldName:Boolean"
// (change) = "onChange($event)"  => event we can subscribe to when change the checkbox 
//                                => event object has 2 properties: - source => reference our MdCheckBox class
//                                                                           => we can see all the properties implemented in this component
//                                                                  - checked: false

// Now lets make a <div> render/not according the state of the check box
// Just use *ngIf => and we reference the checkbox using a template variable => and get access to the property checked


// markup

<md-checkbox
 #showDetails
 [checked]="isChecked"
 (change)="onChange($event)"

> Show details </md-checkbox>

<div
 *ngIf="showDetails.checked" 

>Details are...</div>