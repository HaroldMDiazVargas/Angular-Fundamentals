// How we can use Actions

//--In markup component
// We have a counter => which is inside a <p> element and binding a field in our component ts
// also we have a button with (click) event => binding to increment() method of our component ts

//--In ts component
// we initialize counter field to 0
// we create increment method => in typical angular app => we use => this.counter++
//                                                                => to increment the field counter => modify the state directly here
// However, when using the Redux architecture => we dont modify the state here
//                                            => instead we dispatch an Action
//                                            => This Action goes in the Store => Store knows our root Reducer
//                                                                             => Store passes the action to => the root Reducer
//                                                                                                           => then Reducer looks at that Action
//                                                                                                           => based on the type of Action => it will return a new state
//                                                                             => Then Store will updated its state internally

//                 -------------------------------------------- DATA FLOW----------------------------------------
//        
//                ACTION  -------goes in the ---------> STORE ------Pass action into the root----------> REDUCER
//                                                        |_____<<_______New state____________<<__________|
//                ------------------------------------------------------------------------------------------------
//
// So, on top of the file => import {NgRedux} from 'ng2-redux';
//                        => so this is the primitive type that we work with in redux app
// Now, create a constructor => inject NgRedux<> => remember this is a generic type => so we need to specify a generic argument
//                                               => the generic argument is IAppState => the interface determinates shape of our Store
//                          => constructor(ngRedux : NgRedux<IAppState) => apply access modifier to acces from increment() method
//                          => constructor(private ngRedux : NgRedux<IAppState)
//                      
// So, on increment() method => instead of modify the state directly
//                           => call => this.ngRedux.dispatch() => we need to pass an Action object
//                                                              => as we know => an Action is a simple object that has a type property
//                                                                            => { type: 'INCREMENT' }
//                                                                            => some Actions may carry extra data about the event that just happened
//                                                                            => e.x event post a message => we also can have properties like: body, subject, so on
//                          => So, everytime we define a new Action => we need to go to our Reducer 
//                                                                  => and determinate how the state will change in response to that Action
// 
// 


//--In store.ts
// in rootReducer function => we add switch statement on action.type => this for adding support to our increment action
//                        => if action.type is 'INCREMENT' => return a new state with updated counter 
//                                                         => but currently is not clear what is the type of the state object
//                                                         => so apply a type to state => state:IAppState => so we get the current state of the store
//                                                         => and also apply a type to see clear the state will return => :IAppState
//                                                         => So => return a new object with counter property => set to state.counter, wich is current value of counter plus 1
//                      => So we are not modifing the original state here, we are returning a new state                                                                  

// in interface IAppState => we need to store here in the Store => the current value of the counter
//                                                              => this is because we need to work with the counter    
//                                                              => so declare a property of type number =>  counter:number;    

//--In app.module.ts
// We have a red underline in our constructor => becase our Store know has a counter property that we have not initialized
// So => set counter to 0 in our empty object(initial store) 2nd argument => this is initial state of our store

// Quick review of steps:
// 1. app.component.ts => Inject NgRedux in the constructor 
//                     => increment() method instead of modify the state directyle => we dispatch an action
// 2. in store.ts => modify rootReducer => add support for increment action
//                => also modify the IAppState => know we have counter property
// 3. in app.module.ts => we modify to set initial state of our store

// Improvement this code:
// 1st Issue => We use 'INCREMENT' this magic string in 2 differente places:
//           => - app.component.ts and also in the store
//           => So if we have a typo(typography error) in the code => our code is not gonna work 
//           => So is better to extract it into 1 place defined as a constant 
//          => SOL => in app/ folder create a new file => actions.ts
//                 => export new const called INCREMENT => set it to 'INCREMENT'
//                 => now we can replace those two magic string with this constant
// 2nd Issue => we know that we change IAppState in store.ts
//           => we have to go to app.module.t => and modify the initial state in the constructor
//           => we need to go for/backfor differente files => not a good practice
//          => SOL => in store.ts => export a constant and called as INITIAL_STATE of type IAppState
//                                => set this constant => to { counter:0 }
//                 => now in app.module => replace object with INITIAL_STATE

// Note => If we test app and click the button => the counter is not incremented
//                                             => we have only implemented the part for updating the state
//                                             => reading the state from the store is something else(next lecture)


// src/app/store.ts

import{ INCREMENT } from './actions';

export const INITIAL_STATE: IAppState = {
    counter:0
}

export interface IAppState{
    counter:number;  
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
<p>Counter: {{ counter }}</p>
<button (click)="increment()"> Increment </button>

// app.component.ts

import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from './store';
import{ INCREMENT } from './actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent{
    title = 'app works!';
    counter = 0;
    constructor(private ngRedux : NgRedux<IAppState>){

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