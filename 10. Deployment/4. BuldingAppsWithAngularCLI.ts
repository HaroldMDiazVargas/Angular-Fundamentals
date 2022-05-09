// Use AngularCLI to build our app and get deployable packages for production 
// With these we get all optimization tecnhique mentioned at beginning

// In order to build our app for porduction, run:
// ng build --prod => this will create deployble package that we can copy-pate to a different machine or use FTP or any other mecanizate to deploy for production server 

// If we run => ng build => without --prod flag
// We can see our bundle still big => so we dont have AOT compilation here => Angular compiler is part of the main bundle 
// We can see that we have dist/ folder(distribution) => we can see we have:
// icon, icons bootstrap or awesomeicon, index.html and bundles 
// If we see index.html => Is slightly different that we have in src/ folder 
// In body => <script> => we have refereces to various bundles => In contrast index.html of src/ folder doesnt have any script references
// This is because during development these bundles are injected into the body element at runtime

// So for every bundle in dist/ folder we have two files:
// 1. Actual bundle file    
// 2. Map or sourcer map file => Map a piece of JS code in the bundle to its original source file
// So when we debuggin our app in chrome => this map file allows chrome debugger to show the actual code in the source file => not in the bundle 

// If we see one of these bundles:
// We can see we dont have any optimizatio tecnhiques  => we have alot of comments, alot spaces, long descriptive names 
// We also have dead code => If we have created components or services unused => they will ended in these bundles

 
// Now if we build the app with production flag => ng build --prod
// If we see the size of vendor bundle  => almost half the size =>  This initial size before apply any kind of minification or uglyfication(look in dist/ is anther size)
// We can see in dist/ folder the same icons
// But index.html => we dont have white space => all html markup is represented as 1 long string 
// We see one bundle => we dont see comments, descriptive names
// we can see in filename of bundle => random string called hash => generated based con the content of the bundle => is tecnhique used to prevent cache
// everytime modify code => generate bundle with another hash => this prevents client browser to catches file with exact same name 

// Recap:
// We use angular-cli to build deployble version of our app => we get dist/ folder
// we can simply copy-paste this folder into a non-development machine > use FTP or more advance scenearious => we can set some kind of continous deployble workflow