// Work with buttons

// app.module => add on imports[] MdButtonModule


// In Angular Material we have a number of directives => that we can apply to our buttons to give them material design look and feel
// 1st directive => md-button => personally not recommended
// 2nd directive => md-raised-button => Much better, by default the background color of the button is the background color of our theme
//                                   => to change default background color to the theme => apply color="" attribute
//                                                                                      => 1st. primary
//                                                                                      => 2nd. accent
//                                                                                      => 3rd. warn
//                                  => to change to a customize color our button => there're two ways to achieve this:
//                                                                               => 1st. CSS => not to do, our app we want to have a common and consisten look and feel
//                                                                               => 2nd. Using theme => this concept is to define all the colors in our app => see later
// 3rd directive => md-fab => fabulous/floatable ancher button(fab) =>
//                         => round button that has an icon inside => we dont add a label => instead we add an icon    
//                         => we can also add color attr to change color => same three options before 
//                         => default color of icon is theme color      




//markup

//plain HTML5 
<button md-button > Button1 </button>
<button color="primary" md-raised-button > Button2 </button>
<button color="accent" md-raised-button > Button3 </button>
<button color="warn" md-raised-button > Button4 </button>
<button color="primary" md-fab> check </button>         //check is an icon 


//Angular Material 
