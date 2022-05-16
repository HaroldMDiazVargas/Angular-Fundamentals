// Typography on Angular Material

// In component html
// Lets add a heading and a paragraph

// head over material.angular.io => Guides => Using Angular Material's typography
//                                         => we can see a bunch of css CLASSES we can apply to various elements
//                                                  => e.x title, headline, caption, so on
//                                        => In order to this to work => we need:
//                                        => Import Roboto font that is used by Angular Material => Standard look and feel of Angular Material
//                                        => We can see the link to Roboto font "https://fonts.google...Roboto:300,400,500"
//                                        => copy and paste in styles.css 

// In component html
// we can apply all these CLASSES we saw early
// e.x1 => <p class="mat-body-1" => look all classes are prefix with mat-
//     => so we can see that now we are using Roboto font
// e.x2 => apply "mat-headline" to <h1> elemetn => so we see Roboto font

// Apply all these classes to various elements => is very tedious
//                                             => better way is apply to a global level

// In index.html
// we can apply to <body> element => class called  => "mat-typography"
//                                                 => with these classes we not longer need to apply individuals classes to h,p and other elements

// Code cleaner => same result





// component markup
<h1 class="mat-headline"> Heading </h1> // No need these classes if apply on index GLOBALLY
<p class ="mat-body-1">
    Lorem ipsum dolor...
</p>



// Index html

<body class="mat-typography"> 
    <app-root></app-root>
</body>