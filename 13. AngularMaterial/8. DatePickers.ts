// In material.angular.io => FormControl => Datepicker
// API tab => see define in MdDatepickerModule => register on imports[]
// overview tab => select date and see functionability
//              => <> => see markup => 

// now => first we need to add an input with mdInput directive => inside a md-input-container element
// then => add md-datepicker
//      => collect this datepicker to the input field we created early
//      => so assing a variable #variableName => #birthdate
//      => then on input element => apply  [mdDatepicker] directive => and bind to the template variable 
// Also is common to add an icon => like calendar icon
//      => so add a <button> in the container => to be a Suffix for the input field => apply mdSuffix directive
//                                            => also apply another directive [mdDatepickerToggle] = "templatevariableName" 

// Test => Error => No provider found for DateAdapter => must import MdNativeDateModule or custom implementation
// The MdDatepickerModule is built on top of the NativeDate object on Jscript 
// But currently => team angular => working to add support for moment.js dates
//               => We will have another module => be able to choose between  NativaDate object in javascript or Moment.js dates
// So => for now => import MdNaviteDateModule into our app.module => imports[] => from angular/material

// Test => click to the calendar icon => calendar popup
//      => calendar popup has 2 modes => month mode and year mode => Default open in month mode
//      => month date => we can see all the days of the current mode
//      => click to year => we switch to the year mode => now we can see all the months in the current year 
//      => BUT note that in small screen => we dont see all the days of the current window => this is not good UX

// Solve this UX problem:
// In md-datapicker element we need to set => touchUi property => to "true"  => now see all days an also scroll
// So make sure ALWAYS set touchUi  to true


// Few other functions of datepicker:
// By default if we dont have date in this input field => when click calendar icon => popup opens with the current date selected
// If we put a date in the input field => Calendar popsup with the date e.x Jan 3 2017 selected
// Another thing => is set a range of valid dates => e.x limit user to select a date between 1st of jan 2017 to 1st of august 2017
// So => in input field => set max and min properties => we can bind these proerties to a field => [min]="fieldName"  and [max]="fieldName"

//  Test => currently there's bug in the implementation of the min and max range to disable the days of the last limit 
//       => 2017,8,1 => so the 2nd day of august and till finall => should be disable => but we can see is enable til 1st day of september
//      => this is a bug => may be is fixed currently 

// Another thing is currently no implemented:
// Displaying an error when user adds an invalid date  => e.x type 1234, or name => we dont get any messages => keep track this issues on github
// on github => /angular/material2/issues/4978  

//Sometimes we want to display a calendar automatically
// See doc => API tab => Datepicker has a couple of methods => open() and close()
// open() method => to open the calendar when the input field get focus:
// Bind focus event => call the open method => (focus)="birthdate.open()"  => we used template variable to reference the datepicker

// So => in overview tab => Status of the datepicker => Support, implementations, etc for future release


// markup
<md-input-container>
    <input 
    (focus)="birthdate.open()" 
    [min] = "minDate"
    [max] = "maxDate"
    type="text" mdInput [mdDatepicker]="birthdate" > 
    <button mdSuffix [mdDatepickerToggle]= "birthdate" ></button>
</md-input-container>
<md-datepicker #birthdate touchUi ="true"> </md-datepicker>


//typescript component

minDate = new Date(2017,1,1);         // Native javascript date object => future when we have support for moment.js dates =>we can use those kind of objects here
maxDate = new Date(2017,8,1);