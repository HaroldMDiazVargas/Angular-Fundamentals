// Building Blocks

// In Redux we have 3 pieces:
// 1. The Store => Single JS object that contains the state of the app => think of it as a local client-side database
//              => so we can have properties like the list of messages, #OfNewMessages to be display on the navbar,
//              => wheter chat sound is enable an so on
//              => e.x {
//                      messages: [...],
//                      newMessages: 5,
//                      chatSoundsEnabled: true
//                      }
//              => Different views or components use different parts or differents slices of the app state => depending of the functionality
//              => This also means => If different components need to work with the same slice => there's only 1 copy of that slice through the app
//              => So => once the component modified that slice => the changes are inmmediately visible to other components
//              => we dont have multiple independent copies
//              => ¿Will this consume to much memory? => Not really, unless we are storing 10k or more objects in the store
//              => anyway ¿Why would you store allthat objects?
//              => So for the most part is Ok to have a single object to store the app state
//
// 2. Actions => Are plain JS objects that represent something that has happened in the app
//            => semantically => actions are more like events
//            => If we have some background in CQRS architecture Style => we should know the difference bewteen command and events:
//            => Commands or actions => Represents something that should happend => e.x Posting a message => PostMessageCommand
//            => Events => indicate that some has happened => e.x Message was posted => MessagePostedEvent
//            => Actions in Redux are semantically events
//              =>e.x => when user reads a message, we can represent this action like =>  { type: 'MARK_AS_READ' }
//              =>e.x2 => if the user posts a meesage, we can have an action like => { type:'POST_MESSAGE', body:'...' }
//              => These are simple data structures => and dont have any logic
//              => By convention we use type property to specify the type of each action
//            => Action can have additional properties => related to the event that just happened
//
// 3. Reducers => Is basically a function that specifies how the state changes in response to an action
//             => We can think of reducer as an action handler or an event handler => that determinates how the state changes
//             => What is critial here => the reducer does NOT modify the state => only returns new state 
//                                     => then the Store will internally update the state
//             => So, nowhere in the app we are going to directly modify the state => this is the responsability of the Store
//                                                                                 => Store keeps the state and updates it whenever neccesary
//             => These reducers should be PURE functions =>       