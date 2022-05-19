// Redux DevTools

// Awesome tool that gives us a debuggin experience that we have never seen before
// Lets see this tool => in the app about todoList with and todoDashboard that share same piece of data with redux
// Google => search for chrome redux devtools => extension for chrome and also for firefox

//--In app.module.ts
// On top => import{ ..,..,DevToolsExtension } from 'ng2-redux'
// in constructor => add another parameter => devTools of type => DevToolsExtension
//                                         =>  constructor(ngRedux..., devTools:DevToolsExtension)
//                => not in .configureStore => the 3rd argument is middlewire
//                                              => a middlewire is an extension point
//                                              => so we can executed some code from the moment an action is dispatch to the moment it reaches reducer
//                                              => e.x middlewire is loggin => we can log every action and do something about it
//                                              => in this section we wont use middlewires => so pass an empty array[]
//                                              => .configureStore(rootReducer, INITIAL_STATE,[])
//                                         => the 4th argument is an array of enhancers
//                                              => this is where we goint to use this devtools extension
//                                              => .configureStore(rootReducer, INITIAL_STATE,[], [devTools.enhancer()])
//                                              => this is going to have some COST => so we only want to run this only if app is development mode
//                                              => so on TOP => import {..., idDevMode} from '@angular/core'
//               => declare a enhhancers => var enhancers=  => check if we are in development mode => isDevMode() ?
//                                                             => so => set to an array that includes [devTools.enhancer()]
//                                                             => otherwise => set to empty array => for production => []
//                                      => var enhancers = isDevMode() ? [devTools.enhancer()]:[]
//                                      => remeber: replace 4th argument => with this variable
//
//              => so finally is => .configureStore(rootReducer, INITIAL_STATE,[], enhancers)
//--Test
// So when we add the enhancer => we see icon highlighted int he tool bar 
//                             => that icon is redux devtools
//                             => right click => open it on  right, button or separate panel
// redux devtools 
// we see Log monitor is selected
// we can see initial state of the app => todos: [] => empty array
//                                     => lastUpdate:null
// so in app => add 3 todo items, and rmeove the last
// back to devtools => we can see everty action that has been dispatched
//                  => the date included and how the state changed in response to that action
//                  => so first we have an ADD_TODO action
//                      => we see the action object => title property
//                      => below we can see how the state chanded in response of that action
//                      => now our todos array has 1 item
//                      => and the lastUpdate is modified
//                  => similarly we can see anothers two ADD_TODO actions and one REMOVE_TODO action
//                  => if we click to any of these actions => we disable it 
//                      => and if we return to the app => we see that change reflected
//                      => This is Time Travel Debugging
//                          => go back in time, look at the state and modify
//  => we can see another monitor => instead of Log monitor => change to Inspector
//                                => Inspector monitor gives us a list detail view of what happened
//                                => we can see the list of actions that have been dispatched
//                                => we can see the actions that we have undo
//                                  => if we click to skip => we redoit that action
//                                => also we can restore the app state to any of the previous actions
//                                  => if we click to jump => we see the app after that action was dispatched
//                                => On the right-side we can see a few tabs:
//                                  => Action tab 
//                                  => State tab => look at the state after the response of this action
//                                  => Diff tab => see the diff of the state changes
// => we caan see another monitor => Chart
//                                => this is for see a visual representation of our app state and how it changes
//                                => if we click to => :__: => this icon below => the panel will open of the bottom of screen
//                                                  => with this panel we have a slider to travel back/for in time
//                                                  => we can see a visual representation  => using <> => to move step forward or back
//                               => if we click to => icon of arrow down => to save the current app state and reload it later
//                                                                       => save app state in a json file
//                                                                       => in the json file we have all the actions dispatched
//                                                                       => also in json file are initial state of the app
//                              => so if we reload the page => state is gone => if click to icon of arrow up
//                                                                           => we can reload the state saved before in the json file
//                                                          => get back to app => we have the items and components with the state of json file
//                              => So => we can go to the state of app where => is a BUG
//                                                                           => save the state in json file
//                                                                           => then pass the state file to our caller developer
//                                                                           => then jump start debuggin
//                                                                              => instead of working with the complex form
//                                                                              => adding lots of data every single time load the page
//                                                                              => is very time consuming
//                             => there's also faster way to restore the state
//                             => we dont have to save and load the state everytime
//                             => so => if click to icon of pin => we can set the state as persistent
//                                                              => if we go the page and refresh => we dont see changes(initial state)
//                                                                                               => so we dont clear our app
//                              

// So this gives us a very detail look of how app state is changing from each action to another
// without this tool => if we want to get this visibility => we have to through lots of console.log statement all over the code
// Till here => is all the Basics About Redux 