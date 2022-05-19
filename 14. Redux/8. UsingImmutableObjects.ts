// Immutable Objects to prevent accidental mutation in rootReducer

// Early in the section about change detections => we see a introduction about immutable JS library
// So in terminal => run => npm install immutable --save

//--In app.module.ts
// In constructor => we have INITIAL_STATE => which is a plain JS object
//                                         => we want to convert this into a immutable object 
//                                         => so, on top =>import{ fromJS, Map } from 'immutable';
//                => so we call fromJS(INITIAL_STATE)=> this function is  plain JS object => returns a immutable object
//                                                                                       => which is of type map
//                                                  => ngRedux.configureStore(rootReducer, fromJS(INITIAL_STATE) )
//                                                  => we also hava a map function that makes the same thing
//                                                  => however => if our object has properties that are complex types
//                                                             => fromJS() will apply immutability on those properties as well
//                                          
//              => So, with the immutable object returned of type map
//              => we need to change the constructor => so our state is not longer an instance of IAppStater
//                                                   => is a map of string and any
//                                                   => is => NgRedux<Map<string, any>>
//                                                   => contructor(ngRedux: NgRedux<Map<string, any>> ) 
//                                                   => this Map is a generic type => takes 2 generic parameters
//                                                                                 =>key and value
//                                                                                 => our properties are always string(key)
//                                                                                 => our values can be anything
//                                                  => we have a compile error 
//                                                  => because our rootReducer => is working with instances of IAppState
//                                                  => so we need to make the same changes in rootReducer
//                                                  => we need to replace IAppState with Map
//--In store.ts
// On top =>  import{ Map } from 'immutable';
// in rootReducer signature => change IAppState with => Map<string,any>
//                          => rootReducer(state:Map<string,any> , action): Map<string,any>{}
//                          => with this we can PREVENT ACCIDENTAL MUTATIONS
//                          => because our Map object doesn't have a counter property
//                          => In fact => the property we stored is not accesible using dot notation => state.counter(not accessible)
// And now when working with immutable objects => we dont need tassign anymore
//                                             => so we need to CHOOSE between tassign approach or immutable objects
//                                             => they both have stregnt and weaknesses 
//                                             => so instead of => return tassign()
//                                             => we => return state.set() => call the set method to modify counter property
//                                                   => return state.set('counter', state.get('counter')+1 )
//                                                   => so this .set method => always return a new object
//                                                   => keeping original state unmodified
//--In app.component.ts
// On top => import {Map} from 'immutable';
// change the constructor => instead of=> constructor(private ngRedux: NgRedux<IAppState>)
//                                     => constructor(private ngRedux: NgRedux<Map<string,any>>)    
// then we use the @select decorator => to select the counter property of the state as an observable
//                                   => but we knoe we can not access the counter property like => state.counter(using dot notation)
//                                   => we need to user get method => state.get('counter')                          
//                                   => if we look the documentation fo the @select decorator 
//                                        => they clean that it has support for immutable objects from immutable library   
//                                        => but the example of documentation is not exactly the case we're dealing here
//                                        => the sourcer codes, the test cases => not test case for immutable object
//                                        => so, is not implemented propertly 
//                                        => so the only way we can select a property from the store => using an arrow function
//                                        => so => @select(s => s.get('counter')) count;
//                                        => LOOK if there's implemented update about dealing with this
// So => these are the changes we have to make to work with immutable objects

// Test => click on increment button => counter counts => good

// Recap
// With immutable objects => we prevent accidental muutations
//                        => However => our code is a little more verbose
//                                   => where we had IAppState => we had to use => Map<string,any>
//                                   => Also, we can not => acces state property using dot notation
//                                                       => we have to use .get and .set method
//                                                       => and we have to work with magic string .get('counter')
//                                                       => and if we make a typo our code does not work
//                                  => finally => the interface IAppStore becomes useless
//                                             => because in the rootReducer => we can call state.set('')
//                                                                          => and add property that is not defined in our interface
// Personally => prefer tassign() approach
//            => but if we want to work with this in our app is not problem
//            => either way => for both is better to implement unit test => make sure our reducer is implemented propertly





// src/app/store.ts

import{ INCREMENT } from './actions';
import { tassign } from 'tassign';
import {Map} from'immutable';

export const INITIAL_STATE: IAppState = {
    counter:0
    messaging : { newMessages: 5}
}

export interface IAppState{
    counter:number;
    messaging?: { newMessages: number};
}

export function rootReducer(state: Map<string,any>, action):Map<string,any>{
    switch (action.type){
        case INCREMENT: 
            // return Object.assign({},state,{counter: state.counter+1}) 
            // return { counter: state.counter + 1}
            // return tassign(state, { counter: state.counter+1 }) 
            return state.set('counter', state.get('counter') + 1);

    }
    
}



// app.component.html

<h1>
    {{ title }}
</h1>
<p>Counter: {{ count | async }}</p>
<button (click)="increment()"> Increment </button>

// app.component.ts

import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from './store';
import{ INCREMENT } from './actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    title = 'app works!';

    @select( s=> s.get('counter'))  count;

    // constructor(private ngRedux : NgRedux<IAppState>){
    constructor(private ngRedux: NgRedux<Map<string,any>>)  {
    
    }

    increment(){

        this.ngRedux.dispatch({ type: INCREMENT })
    }
}


// app.module.ts
import{ INITIAL_STATE } from ' ...'
import {Map, fromJS} from 'immutable'
// below....
export class AppModule{
    // constructor(ngRedux: NgRedux<IAppState>){
        constructor(ngRedux: NgRedux<Map<string,any>>){
        // ngRedux.configureStore(rootReducer, { counter:0 })
        ngRedux.configureStore(rootReducer, { fromJS(INITIAL_STATE) })
    }
}