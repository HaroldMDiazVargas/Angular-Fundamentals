// head over => material.angular.io
// in guides page => find => getting stated => see all steps to add Angular Material to our project 

// In terminal
// Stand over the project-angular path 
// run => npm i --save @angular/cdk     => install cdk => means component development kit
//                                      => cdk is one of the dependencies of Angular Material
//                                      => basicly a library allows us to build also components for the web but without adopting the material desing visual language
//                                      => e.x we want to build a reusable datatable => doesnt neccesary have material design visual language
//                                      =>     we can build it with cdk in an agnostic way
// run => npm i --save @angular/material  => install the actual Angular Material package
// or in one way => npm i --save @angular/cdk  @angular/material
// These are the dependencies(essential packages) we need to install
// Optionally => we can install a couple more packages:
//              - One is for adding animations => @angular/animations
//              - Second is for gestures => hammerjs => powerfull library allows us to use gestures support to our page e.x tap with finger, swipe, rotate,so on.
//                   => recommend this hammerjs => to make our app more accesible
// So, in one way => npm i --save @angular/cdk  @angular/material @angular/animations hammerjs
//
// Now include a feel
// In node_modules/@angular/material => we can see prebuilt-themes/ folder => Bunch of themes beatiful => one we most use is indigo-pink.css

// In styles.css
// Import a theme just like we imported bootstrap => using relative path(~) from node_modules
// @import "~@angular/material/prebuilt-themes/indigo-pink.css" 

// Final step
// Go to app.module.ts
// If we want to add animation support => need to import on top BrowserAnimationsModule => otherwise we need to import NoopAnimationsModule
// so, if we previously install @angular/animations => we need to import => BrowserAnimationsModule from '@angular/plaform-browser/animations'
//                                                  => so this is the implementation of the animations module in the browser
// So, if we dont want to have animations => instead of browser module => need to import NoopAnimationsModule from '@angular/plaform-browser/animations'
// Now, in imports[] => we need to import ONE of these modules into NgModule 
//                   => BrowserAnimationsModule 
//

// In app.component.html
// Add a checkbox => so use => <md-checkbox></md-checkbo> => this is the selector of checkbox component
// This is a custom component for render a checkbox 
// Now remember to => register this component => otherwise get error =>
// In app.module.ts 
// Every component in Angular Material is defined in a separate Module
// So, we need to import the module on top and add to imports[] array to our NgModule
// to see the module =>head over material.angular.io components => checkbox => API tab => we see the name of Module in which compoent is defined

// In conclusion:
// 1. Install all dependencies we need to our project
// 2. Include a feel => import in styles.css the feel (theme) we want
// 3. In app.module.ts => import the modules of animations => also the module of the custom component we want to use from Angular Material
//                     => Register imports[] all these importations
// 4. Render selector of the custom component in app.component.html or in the component we want to render