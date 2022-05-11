// How build Animations in our Angular apps

// The @angular/animations( Animations Module) we have a bunch of helper functions for creating animations:
// trigger()
// transition()
// state()
// animate()
// so on

// The anatomy of an Animation is simple:
// Just a transition of 1 state to another state in a DOM element
// In Angular we have 3 kinds of states:
// 1. Void => Represents the state of an element that is not part of the DOM 
//         => This can happen when an element is created but not place in the DOM yet or when is removed
//         => e.x app of TodoList => everytime we add an item in the list => the corresponding element is created but is not in the DOM yet
//                                => It's in the Void state => then it transitions from Void state into a new state *
//         => e.x2 when we delete an item from the Todolist => the corresponding element transitions from its current state * => into the void state
//         => The * => represents what we call the default state 
// 2. Default(*)  => All elements have the default state
// 3. Custom => We dont always use this state => because it only makes sense in certain scenearious
//           => e.x zippy component => where the element is always in the DOM but can be expanded 
//           => change from collapse state => into expanded state 
//           => If we want to implement an animation during this transition => we have to work with custom states => Collapse and Expanded

// e.x apply an animation to the each item to the list
// 1. We start with the components metadata => we have a property called animations
// animations property takes an array => we register 1 or more triggers
// each trigger has a name and an implementation => In this implementation we define all states and transitions for that kind of animations
//  So the function trigger(), state() and transition() => these are the helper function are defined in @angular/animations 
// animations: [
//      trigger('fadeIn', [         //trigger with name 'fadeIn' and implementation in []
//                        state(..)
//                        transition(...)
//                        ])

//]

// Now we can apply this trigger to any DOM elements => @triggerName
// <div @fadeIn></div>