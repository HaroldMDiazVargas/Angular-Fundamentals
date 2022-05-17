// Redux definition

// Redux is a library that helps us manage the state of our app
// This is something we should use in medium to large single page(Large SPA) app with complex dataflows
// If we are building simple app => with simple dataflow => not need Redux
// In fact Redux => can add extra unnecessary complexity to our simple app

// Large SPA
// In a typical Angular app without the Redux in our architecture
// We know that each component maintain the states and the logic behind of view 
// this modules aligns perfectly with the encasuplation principle of OOP
// However => it can be a problem when we have multiple views that are working with the same piece of data
//         => and do not have a pattern child relationship
//         => In this situation we often have a multiple copies of the same data that are independent of each other
//         => So when a view updates son modules => we need to do some extra work to keep the others views in sync
//         => e.x Facebook has 3 views that represent current state of user messages:
//                     => on the navbar => we have icons to show the #of messages 
//                     => message page => we have a view of different messages
//                     => we can also have multiple chat tabs => on the bottom of screen
//                     => These are independent views that need to be Insync
//                     => And the important here => they do not have a parent-child relationship
//                     => the navbar is not a parent of child of other views => if it was => passing data would be simple
//                                                                                        => it would simple use input properties of the child components
//                                                                                        => to pass the data down the subtree
//        => But since these views are independent => if we want to keep them Insyc
//        => we need to do extra work:
//         - common solution => is to use events, sooner or later => it will turn into a event spaghetti
//                           => in a large code base we have events publish all over the place
//                           => to track what happen to the app state => we have to jump all over the code to see whats going on
//                           => problem: the data can be update in an unpredictable way
//                                    => when there's a bug, we have to jump all over the code to figure out 
//                                       how data is flowing and how app state is updated in multiple places
//                          => problem: also adding a new feature becomes a challenge => we dont know what's impact of this new feature
//                                    => on the app state.
//                          => If is touching the same piece of data that is in different places => needs to be kept in sync

// Facebook has solves this problem 2014 => introduced Flux Architecture
// Redux => is a simple file and lightweight implementation of this architecture
//       => provides a clean an elegant solution to this problem => MANAGE THE APP STATE IN A PREDICTABLE WAY => Not surprises
// Benefits of Redux:
// - Predictable application state(mentioned before)
// - Decoupled architecture => decouple our app for a presentation framework like Angular
//                          => we can implement a big scheme of our app and its representation logic 
//                          => using simple functions that are completely decouple from Angular or any other presentation Framework
//                          => Then we can decide => if we use Angular or maybe we can use React 
//                          => So, it allows us to postpone decision about external libraries and framework => which is one of the attributes of Clean Architecture
//                                                                                                          => As we may heard from Uncle Bob
// - Testability => Easier to Unit Test our app without Mocks, Spies and any other tricks/trees? that can make testing both complex and error problem
//               => because Redux is heavily based on function programming 
//               => we will see that we will writing simple functions that take a state an return new state
//               => these functions are really easy to test => so we can run our test before our production code => Test Driven Development(TDD)
// - Great Tooling => We can get some really cool tools as part of our development
//                  => e.x Redux Development tool => we can add to chrome, firebox and other browsers
//                      => this makes increidibly easy to debug our app by allow us inspect the app state in such a way we have never seen before
// -Undo/Redo => Increidibly easy to implement features like Undo and Redo
//            => if we need these features in our app => we can implement them without Redux
//            => But using Redux is much easier
//
// All these fancy benefits come with a cost
// Just like many architecture patterns => we are going to write a bit more code and we will have more moving parts in our app
//                                      => So use Redux only if we are building a medium to large SPA with complex views and dataflows
// 
// When to use Redux
// - Independent copies of the same data in multiple places
// - Multiple views that need to work with the same data and be in sync
// - Users can collaborate and work on the same piece of data => so Data can be updated/changed by userA and at same time by userB
// - Data can be updated by multiple actors => so it can be changed as a result of users actions and at the same time it may arrive from the server
//                                          => either by pulling or push notifications

// When start to do a new app
// -Start simple 
// - If app grows => refactor existent components and use Redux
//                => to manage the app state in a predictable and deterministic way