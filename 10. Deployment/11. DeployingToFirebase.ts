// Firebase

// Platform provided by Google => to build backend of our web/mobile apps
// Real-time databse => which is fast and scalable
// We get cloud messaging
// Hosting, and other services
// use firebase library to store our data in a NoSQL real-time database, and the previous services mentioned

// Head over => console.firebase.google.com => logg in
// Create new project 

// In terminal install firebase tools by npm => npm i -g firebase-tools
// then we need to log into our firebase account in the terminal => run firebase login => open new page and logg in
// Now in the project folder=> initialize firebase => firebase init 
// Then we need to answer some questions => O Database O Functions OHosting => use up/down arrows => select hosting
// Which firebase project we want to use for this directory ? => Select the name of the project we created early

// So this creates 2 files in our project folder:
// 1. firebase.json => Empty object => add bit of configuration
//    => add key "hosting":{} => this object we're going to have a property called "public" => it determinates the name of the directory we're going to publish to firebase
//    => so, we want to deploy the content of the /dist/ folder => "hosting":{"public":"dist"}
// 2. .firebaserc

// Back in the terminal => we need to Rebuild our app for production  => run => ng build --prod ( no need set --base...) 

// The last stept => deploy this to firebase => run => firebase deploy
// Now our app is on firebase => in terminal look Hostin URL => the address of our app 

// However => when we are on followers page => if Ctrl+R => get the page Not Found Error
// This is because our app has a single html file => which is index.html 
// So, when we send a request to this address /followers => firebase thinks this is the name of the file
// But we dont have a file by this name in our directory => we need to set up a simple route in firebase => to tell firebase redirect any URLs to index.html
// There our app loads => our routing kicks in and takes the user to the followers page

// Son in firebase.json => add new key/value pair => "rewrites":[{}] => set to an array => inside of array 1 object with 2 properties => "source" and "destination"
// "source":"**" => this represents any URL; and "destination":"/index.html" => redirect to index.html

// One more time firebase deploy => and go to browser and test app

// Finally => In package.json => custom script => "deploy:firebase":"ng build --prod && firebase deploy"
// In terminal => deploy our app just using => npm run deploy:firebase