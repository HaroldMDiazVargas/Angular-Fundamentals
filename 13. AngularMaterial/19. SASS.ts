// Using SASS 

// CSS
// css is really hard to maintain in a large complex project 
// this is because css we use today => lacks of a lot of features

// CSS Preprocessor
// With css preprocessor => we can use features that dont exist in css yet
//                       => convert our code(css code in the future ) => into valid css that browser can understan today
//                       => e.x analogy => exactly we use typescript to write jscript => tsc transpile our typecript into jscript
//                   

//                  Convert
// Future CSS ----------------------> Standard CSS

// Common CSS Preprocessors
// Each of the common css preprocessors support slightly difference(almost the same) kind of features:
// LESS 
// SASS => Syntactically Awesome Style Sheet => Angular by default supports this css preprocessor
// Stylus

// SASS in angular app
// In src/ folder  => create new file => theme.scss (sass css)
//                                    => register this new file in angular-cli configuration =>.angular-cli.json => in "styles":["theme.scss"]
//                                                                                           => add the relative path to the src folder
//                                    => the changes in angular-cli are not visible unlees we RECOMPILE the app
//                                    => stop => and one more => run => ng serve
// In app.component markup
// Lets add two headings => h1 and h2=> we want to make them blue

// So in theme.scss
// traditional css => h1, h2{ color:.. }...
//                  => in the future if a desing to change the color => have to modify two different places => thats why we define rule for both
//                  => Also we can put all the sheet styles if we need more set up styles => inside the same {} for both heading
//                  => But this is not easy to mantain=> if our app grows => harder and more complex to mantain
// SASS => define variables and give them a value
//      => reuse these variables in multiples places => exactly like variables in jscript and typescript
//      => define a variable $variableName:value; => e.x $color:blue;
//      => Intead of rules h1,h2{} => we separate them => h1{ color: $color }  and h2{color: $color}
//      => In future we can change the value of the variable in just 1 place

// Another features

// - Import
// we have @import "" statement => we can import anothe scss file =>"another.scss"
//                              => SASS will import all the syles define in another.scss and put them here => as if all were part of one
//                              => SASS will concatenate all our sass files into our file

// - Mixin
// Is like a collection of multiple attributes 
// we add @mixin nameMixix => e.x @mixin soft-border {}
//                         => we add in braces => all the share attributes that have 2 elements or 2 .classes, so on
//                         => so we can re use the attributes in various places by including our mixin => @include mixinName()
//                         => we pass like a function => because we can pass arguments to that function
//                         => in the element we want to include => .box{ @include soft-border()}
// Now to add parameters => to the @mixin defintion on top => e.x @mixin soft-border{$border-radius}{}
//                       => this allow us to pass the border-radius from the outside
//                       => so instead of hard-coding the value of that proerty => we pass the parameter
//                       => and when calling this function => using @include => we pass the parameter/s


// Recap
// Basic instroduction of SASS, only:
// - Variables
// - Imports
// - Mixin
// Using to custom theme in our app 




// component markup
<h1> Heading </h1>
<h2> Headin2 </h2>

//theme.scss

// traditional way------------------------


h1, h2{
    color:blue;
}

.box{
    border: 3px solid gold;
    border-radius: 3px;
    padding:10px;
    //... another properties
}

.moder-box{
    border: 3px solid gold;
    border-radius: 3px;
    padding:10px;
    // ...another properties
}



// SASS--------------------
@import "another.scss";

@mixin soft-border($border-radius){
    border: 3px solid gold;
    border-radius: $border-radius;
    padding:10px;
}

.box{
    @include soft-border(5px);
}

.modern-box{
    @include soft-border(10px);
}


$color: blue;

h1{
    color:$color;
}

h2{
    color:$color;
}