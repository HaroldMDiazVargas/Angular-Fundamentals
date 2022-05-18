
// Read the state 

//--in app.component.ts
// At the constructor
// Look at ngRedux => we have a subscribe method => ngRedux.subscribe
//                                               => so ngRedux is an observable
//                 => subscribe to it => ngRedux.subscribe(  ) => here is our listener
//                                                             => ngRedux.subscribe(() => {})
//                                                             => in this listener => we are going to call ngRedux.getState()
//                                                                                                         => this return the current state of the store
//               => log in console and see the state object 
//
// Test app => and click on increment
//          => on console we can see our state object
//          => Object{counter:1} => counter is set to 1
//          => click again => we see that => Object{counter:2}=> increment propertly
//          => so we have succesful implement the part about using Actions

// Now get the counter => and put it on the view
// There are two ways to do this:
// 1. Do in the constructor of app.component => get the state in a variable
//                                           => then set field this.counter to the variable.counter
//   - However =>  this implementation has a two problems
//                1. => subscribe method => returns a subscription
//                   => so we should => handle onDestroy lifecycle hook of the component
//                                   => whenever component is destroy => we should make sure unsubcribe from this subcription
//                                                                    => otherwise we are gonna end with Memory Leaks
//                2. => This implementation a little tedious => we dont want to subscribe to this observable everytime in order to read its properties

// 2. On top import => select decorator => import{ select} from 'ng2-redux';
//                  => with this decorator we can get slice of the app state
//    So on the counter field => apply the select decorator => @select() counter = 0;
//                            => this will internally execute some code like the code inside the constructor:
//                                 - subscribe ngRedux
//                                 - get the current state
//                                 - read the counter property and set to counter field
//                                 - and more importantly => will also ubsubscribe from that subscription where neccesary
//  But take into account => we get an observable => so we dont initialize => @select()  counter = 0;
//                                                                         => we dont need this initialize anyway => @select() counter;
//                                                                         => because we initialized counter early in the Store
//  Now that we have an observable => we can apply the async pipe => to read its current value
//  And we not longer need to write all that code inside constructor 

//--app.component.html
// Apply to counter field is inside interpolation string => async pipe => counter | async


// Look the @Select Decorator:
// By convention the @select decorator gets the name of the field => counter => and looks for a field with the exact same name in the Store 
// Sometimes the name does not match => or we can decide to rename the counter to something else
// So, if we change the field name in our component (.ts and .html)=> ex. from counter => to count
// In @select() count; => we need to specify the name of the property in the Store
// In @select('counter') count;

// Now access a property if is part of a complex object
//--In store.ts
// modify the IAppState => add new property => message => is a new object like:
//                                                     messaging?: { newMessages: number; }
//                      => so our IAppState => define a complex object
// modify the INITIAL_STATE const => messaging : { newMessages: 5}
// we see a red underline => in rootReducer => because the object we return doesnt have this new property
//                        => put optional this property in IAppState interface(TEMPORALLY)

//--In app.component
// Access a property in the Store:
//  - Declare a new field an apply the @select decorator => @select() newMessages;
//                                                       => Instead of a string => we use an array to provide a pass to the target property
//                                                       => @select(['messaging','newMessages']) newMessages;
//                                                       => with this we can acces => messagin.newMessages property in our Store
// - There's another way to access a property in the Store => using a function
//                                                         => @select() newMessagesCount;
//                                                         => we pass an arrow function => add type to s to get intellisense
//                                                         => @select((s:IAppState) => s.messaging.newMessages)  newMessagesCount;







// src/app/store.ts

import{ INCREMENT } from './actions';

export const INITIAL_STATE: IAppState = {
    counter:0
    messaging : { newMessages: 5}
}

export interface IAppState{
    counter:number;
    messaging?: { newMessages: number};
}

export function rootReducer(state: IAppState, action):IAppState{
    switch (action.type){
        case INCREMENT: return { counter: state.counter + 1}
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
    // counter = 0;
    @select('counter') count;
    @select(['messaging','newMessages']) newMessages;
    @select((s:IAppState) => s.messaging.newMessages)  newMessagesCount;

    constructor(private ngRedux : NgRedux<IAppState>){
        // var subscription = ngRedux.subscribe(() => {
        //     var store = ngRedux.getState();              // No need 
        //     this.counter = store.counter;
        // })
    }

    increment(){
        // this.counter++;
        // this.ngRedux.dispatch({ type: 'INCREMENT' })
        this.ngRedux.dispatch({ type: INCREMENT })
    }
}


// app.module.ts
import{ INITIAL_STATE } from ' ...'
// below....
export class AppModule{
    constructor(ngRedux: NgRedux<IAppState>){
        // ngRedux.configureStore(rootReducer, { counter:0 })
        ngRedux.configureStore(rootReducer, { INITIAL_STATE })
    }
}