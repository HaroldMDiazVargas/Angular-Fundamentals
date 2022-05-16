// Create a custom theme


// In theme.scss
// on top=> import sass file that comes with Angular Material 
//       => defined all the colors in the color tool => defined as variables
//       => also includes bunch of mixins, functions, so on
//       => @import "relativePath" => @import "~@angular/material/_theming";
//      => the reliatvePath is => node_modules/@angular/material/prebuilt-themes/ => look the scss file(our SASS file)

//now we need to include => the core styles that are defined in Angular Material 
//                       => these styles give to our component => modern ans consistant look and feel
//                       => so when we use one componer(checkbox, input field,) => all are defined in a mixin called mat-core
//                       => this mixin is defined in Angular Material theme file => _theming.scss
//                       => if we look for that mixin in the file => it has a loop(for)=> below are included all other mixins
//                       => e.x => angular-material-typography() => this mixin defines all the styles for headings, parag, general typography
//                       => each mixin like we know => brings in a bunch of css attributes and their values
//                       => to use this => @include mat-core(); => this means include the core styles
//                       
// now we need to define => our custom colors on top
// we need to define 3 variables or 3 color palettes: primary, accent and warn
// Define our primary palette:
//                       => define a variable $variableName => e.x $app-primary: callFunction()
//                       => this call function is for generating a palette object => in SASS a function is similar to a mixin
//                       => but the function can returns a value => we have a function name => mat-palette()
//                       => to see more details about this function => head over _theming.scss
//                       => we can see: 
//                                  => 1rst parameter => $base-palette => where we specify our color => e.x 'red'
//                                  =>other parameters => have default values => are optional:
//                                  => 2nd parameter => $default:500 => determinates the average tone for that color
//                                  => 3rd parameter => $lighter:100 => lighter version of that color
//                                  => 4th parameter => $darker:700 => darker version of that color 
//                      => mat-palette() => we can pass color with a name(are defined as variables => complex object in the _theming.scss file)
//                      => mat-palette($mat-nameOfColor) => e.x mat-palette($mat-blue)
//                      => we can specify the exact shade we found in the Color Tool:
//                      => mat-palette($mat-blue, 600)
//  
// Define our secondary palette:
//                      => $app-accent: mat-palette($mat-yellow, 700);
// Define our warn palette:
//                      => $app-warn: mat-palette($mat-red);
//
//Theme
// Remember that a theme is a combination of multiple color palettes
// we need to define another variable => $app-theme: => we can use 2 functions for creating a theme => different look of background and fontground colors
//                                                   => these 2 functions are define in _theming.css
//                                                   => 1opt => mat-light-theme()
//                                                   => 2opt => mat-dark-theme()
//                                                   => we can see:
//                                                              => 1st parameter => $primary
//                                                              => 2nd parameter => $accent
//                                                              => 3rd parameter => $warn => optional, by default is set to red color palette
//                                                  => e.x :mat-light-theme($app-primary, $app-accent, $app-warn)
// now we have a theme => so we need to use a mixin to include this theme => @include angular-material-theme()                                        
//                                                                        => as argument pass the theme object
//                                                                        => @include angular-material-theme($app-theme)   
// Quick note => not need memoryze => all the code is on material.angular.io

// Lets see this in action
// Add two buttons in markup => define color of our theme
// To see the difference of mat-dark-theme() => we need to apply a css class to the container of our app(go to markup and add class)
//                                           => this is where our background color is going to come into effect
// So, if container of our app is => e.x <body> element
//                                => add css class that is => <body  class="mat-app-background"></body>
// So we can see the bakground of our app is dark



// theme.scss
@import "~@angular/material/_theming";

@include mat-core();


$app-primary: mat-palette($mat-blue, 600);
$app-accent: mat-palette($mat-yellow, 700);
$app-warn: mat-palette($mat-red);

$app-theme:  mat-light-theme($app-primary, $app-accent, $app-warn)
// $app-theme:  mat-dark-theme($app-primary, $app-accent, $app-warn)

@include angular-material-theme($app-theme);

// component markup

<button color="primary" md-raised-button> Button 1 </button>
<button color="accent" md-raised-button> Button 2</button>