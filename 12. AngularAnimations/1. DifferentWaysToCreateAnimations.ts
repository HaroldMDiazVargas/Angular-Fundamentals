// There're 2 different way to create animations in web apps:

// 1. CSS => We have a couple of properties like transitions and animation
//        => we can animate DOM elements
//        => animate.css => librarythat gives us a bunch of predifined classes for various kinds of animations
//        => Limited control => we often use this for simple, one-shot animations e.g showing a tool tip, toggle UI element state

// 2. Javascript => We use this where we need something more complex and more control 
//               => ther're various libraries gives us an API for implementing animations in JScript 
//               => e.x libraries => jQuery, GSAP, Zepto
//               => But the recommended approach is to use => Web Animations API 
//                                                         => Basicly a specification to animate DOM elements
//                                                         => Currently supported natively in Chrome, Firebox and Opera
// e.x of Web Animeations API
// We get a reference to the DOM element => then we can call the animate method to that element

var element = document.querySelector('#my');
element.animate(...);

// Angular has a Module called @angular/animations
// This module is built on top of the standard Web Animations API
// So, instead of work directly with Web Animations API => we're going to work with the abstractions provided by Angular 
// The benefit is:
// 1. Our code is going to be easy to unit test
// 2. Easy to port in a different platform
// So when we code agains these abstractions => then potentially we can take our code and run inside iOS or Android env
// and use Animations natively in that environment =>  So we're not tied couple the implementation of the Animations in Browsers

