// In this app we have:
// Nav bar with => Homepage link and Followers page link
// This app includes routing and consuming HTTP Services
// Here we only have Front-end => The backedn => Github API is provided by third party => In our app we build the back ourself

// In terms of deployment, we have a couple of options:
// 1. Simplest option is copy entire folder of our project => into a non-development machine 
//   e.x copy this folder => into production machine => then run ng Serve
//   Problems with this approach => Quick losts of files => node_modules/ folder 23000 fies with size more than 230MB
//   Quick solution => excluded this node_modules/ => make a npm install on the target machine => But still another problem => Large bundles
//   main.js, styles.js... 

// Better apply Optimization Techniques
// These techiniques are not specific of Angular => chances are we are familiar with these
// 1. Minification => Remove all comment and white spaces
// 2. Uglification => Involves renaming both description variables and function names into short-crypting names => There're tools do this for us
// 3. Bundling => Angular cli automatics creates bundles => each bundle is combination of various .js files
//              => this allow the client can get a lot portion of app code using 1 http request => faster onclient => and allow the server to serve more clients => e.x can serve 5 request for client and  other clients
//             => Without these if we want to serve our app exactly the way we structured our code => the client has to send hundred of requests to download the app => Inefficient
// 4. Desde code elimination => Involves remove any code that is not part of the app => e.x create classes but we not used anywhere in our app or references of 3rd party libraries unused
// 5. Ahead-of-time (AOT) compilation => This involves pre-compile angular components and their templates => this will have significant improvement in the performance of our app

// Good:
// We can apply all these optimization techniques using a single command with ng-cli => ng build -prod
// When we build our app with -prod flag => angular-cli will produce highly optimize bundles  => then we can simply deploy these files into a non-development machine
