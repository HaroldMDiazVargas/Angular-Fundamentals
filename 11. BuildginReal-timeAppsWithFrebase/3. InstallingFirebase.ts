// Start a new angular project

// run => ng new projectName => ng new firebase-demo

// In root folder => Install a couple o node packages:
// run => npm install firebase angularfire2 --save
// firebase => this is the standard firebase library run in JS
// angularfire2 => this is a library for working with firebase in angular2+ app.

// In src/environments/
// environment.ts => Here we need to copy some setting about our firebase project 
//                => add new key => firebase:{} => inside this object paste the following properties


// In firebase console
// Overview tab => click Add firebase to our web app button 
// A config object is opened => we can see a bunch of properties such as apiKey, domain, databaseURL, etc
// Copy all these properties => Only properties
// paste in the empty object we created in environment.ts =>  this is our firebase database for our development environment
// In a real world sceneario we should have a separate firebase backend for our production environment
// ... this means => go to firebase => create new project with owns settings => then copy all these settings => in environment.prod.ts
// ... dont worry for various environments yet 

// Now in app.module.ts
// In the imports array[] => import 1 or more modules of angular fire
// if auto import plugin doesnt work => on top => import { AngularFireModule } from 'angularfire2'
// And in the imports array => AngularFireModule.initializeApp() => Here we need to pass configuration object from our firebase database
//                                                               => so import the environment object that was exported in the other module(environment module) 
//                          => On top import { environment } from './../environments/environment' => here we have all the settings for our environment development
//                          => AngularFireModule.initializeApp(environment.firebase) => property of environment object we just added
// This AngularFireModule => Is the main module in Angular fire => There're additional modules such as:
//                                                              => AngularFireDatabase, AngularFireAuthentication, so on
// So we should also import AngularFireDatabase because we're gonna work with database => On top => import { AngularFireDatabaseModule } from 'angularfire2/database'
// Add this to imports array after initializeApp => AngularFireDatabaseModule

// Now we've successful install firebase in angular fire in our project