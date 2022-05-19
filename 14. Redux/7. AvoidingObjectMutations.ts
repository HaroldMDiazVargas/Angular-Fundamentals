
// --In the store.ts
// In our rootReducer => we are returning the new state, this is a very simple state
//                    => onyl 1 property => counter
//                    => but, what if we want 10 properties ? we dont want to repeat all these properties here
//                    => return {counter:state.counter+1, prop1:state.prop1, prop2:state.prop2, ...} => very tedious
// So => 2 ways to make a copy of the state object => and apply mutations on the fly

// So=> in JS if we want to take a copy of an object => we can use:
//   =>1.Object.assign() => with this method we can combine multiple objets => into 1 object
//                       => if my target object is an empty object => Object.assign({})
//                       => and my source object is the state object =>  Object.assign({}, state) => the object we get in rootReducer
//                      => we can combine this state object with another => Object.assign({},state,{})
//                      => if the properties names are the same => the values will be picked from this another object
//                      => so, with this we can take all properties of the state object => and apply a mutation using the 3rd argument({})
//                      => So, we can set => Object.assign({},state,{counter: state.counter+1}) 
//                      => with this all properties of the state alon with this counter => will be combined in place into the 1st object(target object)
//                      => so, we return it to the caller of the rootReducer => return Object.assign({},state,{counter: state.counter+1}) 
//                      =>there's a tiny PROBLEM with this approach
//                          =>in the 3rd argument => we can add a property that does not exist in the state
//                          => our state is of type IAppState => this interface determinates the shape of our store
//                          => tecnhically we shoud not have any property in the store that we have not declared here
//
//  => 2. tassign()    => for this reason someone has implemented a type safe version of Object.assign => we can install by npm
//                     => run => npm install tassign --save
//                     => So => on top store.ts => import {tassign} from 'tassign'
//                     => now we replace for => return tassign(source object, mutation)
//                     => return tassign(state, { counter: state.counter+1 }) 
//                     => with this if we add another property that does not belong in the state object => we get red underline => compiler error
//                     => because this tsassign function looks all the properties bind in the state object  => type safe
//                     => Also the signature of this function is better => Only 2 args => source obj and the mutation
//                     => There's 1 more problem is the rootReducer 
//                     => we should not mutate the state object => and that's why we applied the tassign to apply mutation
//                     => however => ther's nothing in rootReucer => stop us to write code  like:
//                                => case INCREMENT:  
//                                =>    state.counter++; => mutating the source object => will create bugs in our app when using redux
//                                => Ther're 2 ways to prevent this:
//                                  => 1. Use unit test => for every action we're going to handle => we write 2 tests:
//                                                      => One to ensure that source state is not modified
//                                                      => Other to ensure that the state that reducer returns has the right values
//                                  => 2. Use Immutable Objects => see next section
//                               
//                       





// src/app/store.ts

import{ INCREMENT } from './actions';
import { tassign } from 'tassign';

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
        case INCREMENT: 
            // return Object.assign({},state,{counter: state.counter+1}) 
            // return { counter: state.counter + 1}
            return tassign(state, { counter: state.counter+1 }) 
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