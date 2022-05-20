
// As our app grows => we introduce new actions => we end with fat reducer with many cases
// So when our app grows to size => indication we need to break into smaller and more maintable parts or modules
// Lets create 2 modules for this demo:
// 1. messaging => which contains messages component
// 2. tasking =>  which contains todo-dasboard and todo-list components

//--In store.ts
// We need to keep the structure of this store in every module
// So in every module we want to have => an interface that determinates the state of that module
//                                    => an initial state object
//                                    => and a reducer which is specificly design for that module
//In our current implementation => we have 4 cases which is specifically for working with todo items
//                              => and the other 2 cases are for messaging modules
// So, we want to break this reducer => into smaller and more maintanable reducer functions

//--In tasking module(taskin folder)
// lets create two files => actions.ts and store.ts
// and in this --actions.ts => paste from the original actions => the ones that correspond to the4  actions of todo items
// and in this --store.ts => paste all the original store.ts 
//                        => change name of interface =>from IAppState => to ITaskingState
//                                                    => simplify by letting only the properties about todo items
//                        => rename the INITIAL_STATE const => to => TASKING_INITIAL_STATE => and also its type
//                        => delete helper functions that are not about todo items
//                        =>in the reducer change the type to ITaskingState => and only let the cases about todo items
//                        => also change the rootReducer name => to => taskingReducer
//

//-- In store.ts(original)
// on top => import { ITaskingState} from '.tasking/store' and remove the the imports from .actions dont need 
// simplify the IAppState interface => add new property => taskin:ITaskingState => so we are break our fat interface into smaller/more managable interfaces
// initial state => instead of todos and lastUpdate => set => tasking: TASKIN_INITIAL_STATE => remember import on top
// remove all helper functions 
// simplify the reducer => remove the cases about the todo items

//--In messaging module
// lets make the same that we made for tasking module:
// create two files => actions.ts and store.ts
// and in this --actions.ts => paste from the original actions => the ones that correspond to the actions of messaging
// and in this --store.ts => pase all the original store.ts
//                        => change name of interface => from IAppState => to IMessaginState
//                                                    => simplify by letting only the properties about messaging 
//                        => rename de INITIAL_STATE const => to => MESSAGING_INITIAL_STATE => an also its type
//                        => delete helper functions that are not about messaging
//                        => in the reducer change the type to IMessagingState => and let the two cases about messaging 
//                         => also change the rootReducer name => to => messagingReducer

//--In store.ts(original)
// On top => import{ IMessagingState } from '.messaging/store' and remove the imports from .actions
// simplify the IAppState interfac => add new property => messaging:IMessagingState
// initial state => instead of newMessages => set => messaging: MESSAGING_INITIAL_STATE => remember import on top
// remove all the helper functions
// simplify the reducer => so the reducer will not have anythin about the switch case




// After abstraction 
//-- In store.ts(original)
// on top import => {combineReducers} from 'redux' => function
// so => delete the rootReducer function => instead => export a const called rootReducer
//                                                  => set this constant to the return value of combineReducers()
//   => export const rootReducer = combineReducers({}) => this function takes a map object
//                                                   => we map properties of our app state to their corresponding reducers
//                                                   => so our app state has 2 properties => tasking and messaging
//                                                   => so to the function => we give a key/value pair 
//                                                                         => ex tasking:
//                                                                         => associated this to tasking reducer defined in tasking/store.ts
//                                                                         => so => tasking: taskingReducer
//                                                                         => so => messaging: messagingReducer
//                                                                         => remember import these reducers 
//  => so this is how we combine multiple reducers => store the result into the rootReducer
//                                                  => and return it
//


//-- In console log
// we should see the next error
// In ./TodoDashboardComponent cannot read property 'length' of undefined

//--In todo-dashboard.component.ts
// we fix the path of import of actions
// to fix the error of console => is because our app state not longer has a property called todos or lastUpdate
//                             => because we have put this another property => called => tasking 
//                             => so the select decorator => we use an arrow function
//                                => @select(s => s.tasking.todos) todos;
//                                => @select(s => s.tasking.lastUpdate) lastUpdate;

//-- In todo-list.component.ts
// fix path to actions
// we make the same fix => @select(s => s.tasking.todos) todos

//--In messaging.component.ts
// fix path to the actions
// we make the same fix => @select(s => s.messaging.newMessages) newMessages;

//--TEST => All must work




//--src/app/ store.ts
import { tassign } from 'tassign'; 
// import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS, INCREMENT, DECREMENT } from './actions'; 
import {ITaskingState, TASKING_INITIAL_STATE, taskingReducer} from '.tasking/store'
import {IMessagingState, MESSAGING_INITIAL_STATE, messagingReducer} from '.messaging/store'
import {combineReducers} from 'redux'

export interface IAppState {
  tasking: ITaskingState,
  // todos: any[];
  // lastUpdate: Date; 
  // newMessages: number;
  messaging: IMessagingState
}

export const INITIAL_STATE: IAppState = { 
  tasking: TASKING_INITIAL_STATE,
  // todos: [],
  // lastUpdate: null,
  // newMessages: 0
  messaging: MESSAGING_INITIAL_STATE
}

// function addTodo(state, action) {
//   var newTodo = { id: state.todos.length + 1, title: action.title };

//   return tassign(state, {
//     todos: state.todos.concat(newTodo),
//     lastUpdate: new Date()
//   });
// }

// function toggleTodo(state, action) {
//   var todo = state.todos.find(t => t.id === action.id);

//   // Now, we need to find the position of this item in the array. 
//   var index = state.todos.indexOf(todo);

//   return tassign(state, {
//     todos: [
//       ...state.todos.slice(0, index),
//       tassign(todo, { isCompleted: !todo.isCompleted }),
//       ...state.todos.slice(index + 1),
//     ],
//     lastUpdate: new Date()
//   });
// }

// function removeTodo(state, action) {
//   return tassign(state, {
//     todos: state.todos.filter(t => t.id !== action.id),
//     lastUpdate: new Date()
//   });
// }

// function clearTodos(state, action) {
//   return tassign(state, {
//     todos: [],
//     lastUpdate: new Date()
//   });
// }

// function increment(state, action) {
//   return tassign(state, { newMessages: state.newMessages + 1 });
// }

// function decrement(state, action) {
//   return tassign(state, { newMessages: state.newMessages - 1 });
// }

// export function rootReducer(state: IAppState, action): IAppState {
//   // switch (action.type) {
//   //   // case ADD_TODO: return addTodo(state, action);
//   //   // case TOGGLE_TODO: return toggleTodo(state, action);
//   //   // case REMOVE_TODO: return removeTodo(state, action);
//   //   // case CLEAR_TODOS: return clearTodos(state, action);
//   //   case INCREMENT: return increment(state, action);
//   //   case DECREMENT: return decrement(state, action);
//   // }

//   return state; 
// }

export const rootReducer = combineReducers({
  tasking: taskingReducer,
  messaging: messagingReducer
});


//--src/app actions.ts


// export const ADD_TODO = 'ADD_TODO'; 
// export const TOGGLE_TODO = 'TOGGLE_TODO'; 
// export const REMOVE_TODO = 'REMOVE_TODO'; 
// export const CLEAR_TODOS = 'CLEAR_TODOS'; 

// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT'; 



//--Tasking/store.ts

import { tassign } from 'tassign'; 
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from './actions'; 

export interface ITaskingState {
  todos: any[];
  lastUpdate: Date; 
  // newMessages: number;
}

export const TASKING_INITIAL_STATE: ITaskingState = { 
  todos: [],
  lastUpdate: null,
  // newMessages: 0
}

function addTodo(state, action) {
  var newTodo = { id: state.todos.length + 1, title: action.title };

  return tassign(state, {
    todos: state.todos.concat(newTodo),
    lastUpdate: new Date()
  });
}

function toggleTodo(state, action) {
  var todo = state.todos.find(t => t.id === action.id);

  // Now, we need to find the position of this item in the array. 
  var index = state.todos.indexOf(todo);

  return tassign(state, {
    todos: [
      ...state.todos.slice(0, index),
      tassign(todo, { isCompleted: !todo.isCompleted }),
      ...state.todos.slice(index + 1),
    ],
    lastUpdate: new Date()
  });
}

function removeTodo(state, action) {
  return tassign(state, {
    todos: state.todos.filter(t => t.id !== action.id),
    lastUpdate: new Date()
  });
}

function clearTodos(state, action) {
  return tassign(state, {
    todos: [],
    lastUpdate: new Date()
  });
}


export function taskingReducer(state: ITaskingState, action): ITaskingState {
  switch (action.type) {
    case ADD_TODO: return addTodo(state, action);
    case TOGGLE_TODO: return toggleTodo(state, action);
    case REMOVE_TODO: return removeTodo(state, action);
    case CLEAR_TODOS: return clearTodos(state, action);
  }

  return state; 
}

//--Tasking/actions.ts

export const ADD_TODO = 'ADD_TODO'; 
export const TOGGLE_TODO = 'TOGGLE_TODO'; 
export const REMOVE_TODO = 'REMOVE_TODO'; 
export const CLEAR_TODOS = 'CLEAR_TODOS'; 


//--Messaging/store.ts

import { tassign } from 'tassign'; 
import { INCREMENT, DECREMENT } from './actions'; 


export interface IMessagingState {
  // todos: any[];
  // lastUpdate: Date; 
  newMessages: number;
}

export const MESSAGING_INITIAL_STATE: IMessagingState= { 
  // todos: [],
  // lastUpdate: null,
  newMessages: 0
}


function increment(state, action) {
  return tassign(state, { newMessages: state.newMessages + 1 });
}

function decrement(state, action) {
  return tassign(state, { newMessages: state.newMessages - 1 });
}

export function messagingReducer(state: IMessagingState, action): IMessagingState {
  switch (action.type) {
    // case ADD_TODO: return addTodo(state, action);
    // case TOGGLE_TODO: return toggleTodo(state, action);
    // case REMOVE_TODO: return removeTodo(state, action);
    // case CLEAR_TODOS: return clearTodos(state, action);
    case INCREMENT: return increment(state, action);
    case DECREMENT: return decrement(state, action);
  }

  return state; 
}


//--Messaging/actions.ts


export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT'; 
