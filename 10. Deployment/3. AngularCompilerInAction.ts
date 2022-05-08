// If we see package.json => under devDependencies{} => we can see a dependency to angular/compiler-cli 
//this is the angular compiler package that takes significant part of our main bundle

// To run this compiler => In terminal we can run angualr compiler from node_modules/ folder
// node_modules/.bin/ngc + enter => .bin means where binary files are located and ngc means angular compiler
// angular compilers compile our components and their templates

// We can see we have 25 new files  => In every component folder we have new file => 
// component.css.shim.ngstyle.ts  => export a const wich is an array (empty if not styles)
// component.ngfactory.ts   => combination of the component and its template => this code is generated at runtime => like this is ts then it will be transpile to js and then executed
//                          => the result of this => is the component render in DOM => This code is crypted

// If we go to lets same component.html =>  and add something wrong (lets say a field inside interpolation string that doesnt exist in ts)

// If we run again angular compiler => node_modules/.bin/ngc + enter
// We can see the error in console => So this is the benefit of AOT compilation => we can catch the errors of the templates earlier

// In real world we dont have to run the command line => just for demostration 
// Instead we use angular-cli to build angular app for production => angular-cli will internally run angular compiler 



