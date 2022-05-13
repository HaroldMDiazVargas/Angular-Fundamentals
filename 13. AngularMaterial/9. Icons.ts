// Just like bootstrap we have a modern beutiful icons  in Angular Material

// Head over => material.io/icons => list of icons 
// Each icon has a label => this label is what we are going to use in our mark up


// Head over => material.angular.io => guides => getting started => scroll down => Step6 : Add Material icons
// we need to import the Material icons font from googleapis.com 
// Copy url => "https://fonts.googleapis.com/icon?family=Material+Icons"
// we can either add this as <link> element or using @import in styles.css(more elegant way)

// In styles.css
// import statemant and paste the address => @import "https://fonts.googleapis.com/icon?family=Material+Icons";

// In app.module
// Import MdIconModule into imports[] array

// In component html
// add an icon using <md-icon> NameOfIcon </md-icon>
// So in the list of icons see => name e.x add alert => just type add_alert
//                                                   => use underline because we have 2 words, otherwise we end with 2 icons
//
// If we want to change color of icon => ther're 2 ways:
// 1. Using CSS 
// 2. Using custom theme => later

//In component css
// Apply style to our md-icon { color: purple }
// if we want to set the color to specific icon => e.x add-alert or id 

//markup

<md-icon> add_alert </md-icon>