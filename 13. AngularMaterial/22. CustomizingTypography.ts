// Customize typography

// We saw Roboto is default font we import on styles.css and used globally
// So, replace this font with a different font:
// head over => fonts.google.com => ex. look for Open Sans font     
//                               => copy url => paste in styles.css => @import "https:/fonts..."


// In theme.scss
// Start define a varible => $app-typography: => call a function called => mat-typography-config()
//                        => parameters of this function are:
//                          => 1st parameter => $font-family => default is set to Roboto
//                          => 2nd-end => labels => which are the classes we saw in typography doc in angular material website
//                        => So, if we want to further customize with of these classes => we need to pass additional arguments to this function
//                        => if not, we let all default values => e.x $headline =>mat-typography-level(fontSize, lineHeight, fontWeight)
//                        => Now, to customize the font => for this demo pass the 1st argment => $font-family
//                        => $app-typography: mat-typography-config( $font-family: "Open Sans", otherSansSerif )
//
//Now include this custom app-typography object => for this use pre-define mixin call => angular-material-typography()
//                                              => @include angular-material-typography($app-typography);
// Test => all we see in website is  Open sans font
//
//
// Customize Heading:
// In mat-typography-config() => we have an argument called $headline => use for <h1> elements
//                            => so just copy from the declaration => $headline: mat-typography-level(24px,32px,400)
//                            => change fontsize to 35, and bold =>  $headline: mat-typography-level(35px,32px,700)



// Theme.scss

$app-typograph = mat-typography-config(
                $font-family:"Open Sans", "Helvetica", "sans-serif";
                $headline: mat-typography-level(35px,32px,700);
)


// component markup
<h1> Heading </h1> // No need any classes if apply on index GLOBALLY
<p>
    Lorem ipsum dolor...
</p>



// Index html

<body class="mat-typography"> 
    <app-root></app-root>
</body>



            