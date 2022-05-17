// Pure Function

// A function is pure if we give it the same input  => we always get the same output
//                                                  => no matter how many times we call that function
//                                                  => So, it should not have any side effects

// Few examples o impure functions
// ex1.
// The next function is impure:
//
// function increment(input){
//      input.count++;                  // mutating arguments
//      }
//
// Everytime we call it => it is modifing its arguments
// So, if the value of the count property of the input => is initially 0
// and we call this function => 10 times to increment it => instead of getting 1 => we get 10
// So, in a pure function => we should not mutate or modify any of the arguments


// ex2.
//
// function increment(input){
//      service.addMessage(...)         // making backed calls
// }
//
// In this function we are making backend calls by of the service => this is an example of the side effect
// Evertyime we call this function => our app state stored in a database on the server => is modified

// ex3.
//
// function increment(input){
//      input.count += Math.random();  // Using an impure function(.random)   
// }
//
// In this function we are updating the value of the count property => based on a random number generated by the Math class
// with this function => if we give to it the same input => we can not ensure we always get the same output
// the always is different everytime => because we are using an impure function(Math.random)
// So, we can not use any other function that returns a different value everytime we call it


// Example of pure function
// ex1 preview => changed to Pure function
//
//  function increment(input){
//      return{ count: input.count+1 };
// }
//
// Instead of incrementing the count property => we return a new object with the count property 
// and the value of this count property will be the value of the original count plus(+) 1
// If we call this function 10 times and give it the same input => we always get the same output
//
// So in Redux our Reducers should be pure functions
// Now, lets take again this example => modify a little bit to make it looks like a reducer function in Redux
// In Redux => a reducer function always takes 2 arguments
//          => function reducer(state, action) => the current state and an action
//          => then based on the action type => they return a new state
//          => so, typically => we use a switch() statement => switch (action.type){} => on the type property of the action
//          => based on the value of the type property => we return a new state
//          => e.x => Imagine action that type is 'INCREMENT' => so it returns a new state with the updated property
//                                                            => we're not gonna modify the original state passed to this function
//                 => function reducer(state, action){
//                          swithc (action.type){
//                              case 'INCREMENT':
//                                     return { count: state.count + 1};
//                                              }
//                          }   
//
//         => So ¿ Why are not allow to mutated or modify state? We always have to return a new state
//                => Ther're a number of benefits to this approach:
//                  => 1. Pure Function are really easy to test => e.x for the previous function if we want to run a test we dont need any mocks, spies
//                                                              => simple call this function => give it an input => and make an assertion about the output
//                  => 2. This approach makes really easy to implement features like => Undo and Redo
//                                                                                   => because we alway keep the previous state instead of modify it
//                  => 3. This approach gives us a powerful tool => which is called => Time travel debugging
//                                                                                  => To travel back in time => look at our app state as different actions are triggered in the app
//                                                                                  => we can see how the app state is modified in every step
//                                                                                  => this makes really easy to find bugs and fix them
//