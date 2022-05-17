// Installing Redux

// Add Redux to an Angular app
// There're many implementation from redux, but the 2 common implementations are:
// These are very similar in terms of the API
// 1. ngrx/store => github.com/ngrx/store
//               => Has gone the route of re-implementing the redux pattern in an angular 2 and are ex-friendly way
//               => this means => is not comparable with other libraries built for redux
// 2. ng2-redux => github.com/angular-redux/ng2-redux
//              => Built on top of the real redux library => is compatible with much of the redux ecosystems
//              => Adds binding for angular 2, so it can easily connects our angular components with redux


// We're gonna use ng2-redux implementation
// Before get started
// make sure we have the latest version of angular-cli => run => ng --version
// if not => run => npm install angular-cli -g

// Now, create a new folder => e.x => redux-demo/
// then, run => ng init => over this new folder
// if we see package.json => we see we are using @angular/common: 2.3.1
// we need to see if the older version of redux is compatible with older version of angular

// Now run => npm install redux ng2-redux --save
// - redux in the cli means => this is the main redux library for JS, nothing to to with angular
// - ng2-redux => provides an angular module for dependency injection, as well so other helpers that we are gonna use
// - --save => to add to the project

// Implement Redux in the app
// 1st src/app/ folder => 
//     add new file => e.x store.ts => export new interface called IAppState 
//                                      => this interface determinates the shape(what properties we are gonna have) of our store
//                                  => also export a function called rootReducer()
//                                      => so, we start with 1 reducer here => as app grows => we can break down this function into smaller, more maintanable functions
//                                      => each focusing one domain at the app
//                                      => each reducer takes 2 parameters => current state and an action, and returns a new state

// 2nd app.module.ts =>
//    On top we need to import a couple of types from ng2-redux
//          => import { NgRedux, NgReduxModule } from 'ng2-redux';
//          => remember imports NgReduxModule into our main module => for dependency injection => so add in imports:[]
//    On top also import the interface and function created before on store.ts
//          => import { IAppState, rootReducer } from './store';
//    Below => we gonna create a constructor for AppModule{ constructor() }
//          => this constructor should get an object called => ngRedux of type NgRedux that we imported on top
//          => this type is generic => need specify a generic parameter in <> => we pass here is the interface we declared early in store.ts
//                                  => AppModule{ constructor(ngRedux: NgRedux<IAppState> ) {}
//          => so we use ngRedux object and call => .configureStore() => method to initialize our store
//                                               => 1st argument => should be a root reducer => so rootReducer
//                                               => 2nd argument => is our initial store => pass an empy JS object
//                                                               => our store object that will eventually get update as we go throught this section
//              
// So to test installation is success:
// run => ng serve => we shouldnt see any errors in screen or console


// src/app/store.ts

export interface IAppState{

}

export function rootReducer(state, action){
    return state;
}