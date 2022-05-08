// Every angular app involves a compilation stept
// We havent seen this compilation because it happens behind the scenes

// In angular framework we have a compiler
// Tha job of this compiler is little different from other compilers 
// e.x C++ compiler takes C++ code and convert it into a different language => like machine code
// Angular compiler takes JS code and produces JS code => this maybe confusing

// If we have a template(.html) with interpolation string => if we put this on a browser we'll just see static text 
// So the braces of interpolation string is only meaningful for angular
// The same is true for all the properties and event binding expressions => browsers dont understand that

// So when our app stars => Angular compiler is going to kick it => is going to walk down the three of our components
//and for each component is going to parse its template => based on this template produces some JS code to create the structure in the DOM

//e.x  When angular compilers parses the template for our component => it produces some code like this:
// var div = document.createElement('div');  // create div
// var h1 = document.createElement('h1');   // create h1
// div.appendChild(h1);                     // append h1 as child of the div
// After this is going to be some code to take the value of the title field from our component(.ts) and display in the DOM
// Also there is going to be more code for detecting the changes of the field and refreshing the DOM if neccessarly

// Angular compiler will produce this JS code at runtime => then this code will be executed => as a result will see the view
// This is what we call => Just-in-time Compilation(JIT) => Other words the compilation that happens in runtime

// JIT is perfectyly fine when we're developting our app in local machine => but if very inefficient for production environment
// because this compilation step is going to happen for every user of our app
// So => everytime the user lands our app => angular compiler is going to walk down the tree of our components => compile all these components and theirs themplates
// As number of components increases or as templates get more complex => this compilation step ig going to take longer
// For this reason => we have to ship angular compiler as part of the main(vendor) bundle .js => this is why our main bundler is large even for a simple app
// Because almost half of the bundle is dedicated to angular compiler
// with JIT we see the template errors at runtime
// Also if we have a complex app with a lot of pages => we maybe not be aware the errors in our template => until we navigate to a particular page in our app
//Solution to allthese? AOT

// We can perform compilation stept Ahead-of-time(AOT) before deploy our app => So this compilation stept doesnt have happen for every user
// Our users will download the final pre-compile app => so our app will start faster => the browser doesnt have to wait for angular compiler to compile our app
// We not longer have to ship angular compiler with uour main bundle => this reduce size of bundle 
// Also we can catch all template errors earlier at compile time => before deploy our app
// We get also better security  => because we compile html templates and components into JS files long before they are serve to the client 
// With not templates to read and not risky kind html or JS evaluation => there're less oportunities for injection attacks




