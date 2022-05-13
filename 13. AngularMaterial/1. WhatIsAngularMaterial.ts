// Angular Material
// Is a library of re-usable and high-quiality UI components built with Angular and Typescript
// These components are:
// - Internationalized => users with different languages can use them
// - clean and simple API 
// - well tested with unit and integration test
// - customizable
// - very fast and has minimal performance overhead
// - almost well-documented

// head over to => material.angular.io
// components tab => we can see various kind of components:
// - Form Controls => like radio buttons, checkboxes, input fields, so on
// - Navigation => toolbars, menus, slidenavs
// - Layout => Lists, grid-lists, cards 
// - Buttons, indicators & icons => Buttons toggles, progress bars, progress spinners
// - Popups & Modals => Dialogs, tooltips, snackbars 
// - Data table => Tables, sorting and pagination

// examples of some of these
// 1. See => Form Controls  => checkbox => examples tab => we can see the checkboxes and radio buttons in action
//    So, this checkboxes have same API as the native checkboxes => But they look very pretty and also have some nice animation
//    Esily add these to our app => using Angular Material
// 2. See => Popups & Modals => diaglo => examples tab => we see button Launch dialog => click on this we get a Dialog with nice animation

// But we have dialogs in Bootstrap => why should be use this dialog in Angular Material
// Bootstrap and Angular Material are two different libraries built by different teams
// Bootrstrap was built a few years ago using plain old Jscript => nothing to do with angular
//   So => all code we have in Bootrstrap libraries we can not easily use them in our Angular app => we need to create custom directives and custom components
//      => do some magic to use these components
//      => we have to use 3rd-party components => that are based on Bootstrap => so app is going to be depedency to libraries built by others
//                                                                            => this libraries can break at any time
// Angular Material is built specifically for angular apps => we can simple import a module and use Angular Material Components just like we use our custom component
//      => Also in terms of statics Bootstrap has a different desing language => All the bootstrap components have a different look and feel
//      => Angular Material is based on the material design => which is a visual language developed by Google in 2014 
//                                                          => this is the language we see in google+, android  and many other apps
// In conclusion
// We can use Bootstrap and also we can use Angular Material 
// If we want to build an app with complex UI => chances are some components we need may be not part of Angular Material
// In Angular Material => all components are built with the same list of quality standards 
//                     => we have a common API well tested
//                     => easily use in angular apps
