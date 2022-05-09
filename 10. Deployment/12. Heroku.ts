// Heroku
// Cloud platform-as-a-service(PaaS) that lets we build, monitor and scale our apps
// One of the best PaaS option out there => suitable when we want to build the backend of our app ourselves
// So, if we want to use ASP.NET or Node on the server => build this backend ourselves from scratch 

// In root folder of our project => see server.js file => simple backend implementation
// This is a simple node application 

// Go to heroku.com => create an account => go to google search => heroku cli
// Find the installers for various platforms => Download and install heroku-cli 
// In terminal run => heroku --version
// Now logg in 
// run => heroku login => and enter email and password
// Now create a new heroku app
// run => heroku create uniqueName or leave the name and heroku-cli will generate random name
//     => We will see the address of our app on heroku and the name of our heroku app
// run => heroku open => open the address in browser 

// Now go to package.json 
// when we deploy our app => heroku is going to look at this file package.json => look at all these depedencies and install all these with npm
// at this point we want to build our app using angular-cli on heroku
// angular-cli is one of the devDependencies => heroku is not goint to install this
// by default we can not build angular app using angular-cli on heroky => to fix this issue => move angular-cli to the dependencies node
// So copy angular-cli and also compiler-cli(we need for AOT compilation when provide the --prod flag)  => paste to dependencies 
// This angular-compiler is built on top of typescript compiler(tsc) => so as another dependency => we also must move typescript
// Now we have the dependencies => heroku will install all of these => we need to build our app

// In script section of package.json => add postinstall script => "postinstall":"" => this is a reserved script => and is run automatically after all dependencies are install
// "postinstall":"ng build --prod"
// At this point our Front-End is ready

// Back to server.js in root folder
// We can see that we import express => this is a framework for build webapps on node
// So, because on the backend we are using express => we need to add it as a dependency to package.json as well
// run in terminal => npm express --save 

// Las stept
// In scripts section of package.json => we need to change the "start" script => instead of serve the angular app("ng serve") => we need to start our node server
// "start":"node server.js" => node is going to run the server.js which is our webserver 
// the job of this webserver is to host our static content and expose any APIendpoint

// Bacj to server.js in root folder
// we call express(we import) => call like a function express() => gives us an app object
// then we tell this app object => to host our static content from the /dist folder (this folder we store our built angular app)
// In this app we dont have any APIendpoint 
// But we will be adding our APIendpoint after this
// maybe a couple of APIendpoints  or may have a complex app => instead of adding APIendpoint in server.js => have a folder like /server => for each APIendpoint have a separate JS file
// e.x course.js, messages.js , son on
// So we register all our APIendpoints => In our handlers => we simple use a database like Mongo or whatever => to get or save the data
// After that we are catching all invalid routes => for any other routes => send dist/index.html to the client => solving the same problem when we had in deploy our app in firebase
// Finally in last code line 
// We are listening on the environment port => which is often 80=> if is not supply 8080


// Now to deploy our app 
// 1. Commit our changes to git => git add, git commit -m "Prepare for heroku"

// When we create an app using heroku-cli  =>e.x when we run heroku create => this cli registers a remote for this git respository
// run => git remote => we have 2 remotes => origin and heroku
// So everytime we want to deploy our app => We just have to push our changes to heroku
// At this point heroku has a continous deployment process (source code) => kicks in 
// => it checks out all the latest code from that repository
// => it's going  to install the dependencies
// => it's going to build the application
// => and it's going to run the node server

//So run => git push heroku master
// final run => heroku open => look our app is successful

