// Different Types of Tests 

// In general we have 3 types of tests
// 1. Unit Test => We test the component IN ISOLATION, without external resourcer(e.g file system, database, APIendpoints)
//              => In Angular terms => means testing a component in isolation without its template and any other resources
//                                  => so if our component is using a Service to talk to APIendpoint => we give it a fake instance of that service
//                                                                                                   => we assume the Service is doing its job properly
//                                                                                                   => we only focus at the functionality of the component
//                                  => similarly if our component is using a Route => we give it a fake router
//                                                                                 => not the real router that works with the browserAPI to take the user to different page
//             => Benefits:
//                  => Are easiest to write
//                  => Are super fast
//             => Drawbacks:
//                  => But dont give us much confidence about the functionality of our app
//            => ex:
                //component.ts
                export class VoteComponent{
                    totalVotes:number;

                    upVote(){
                        this.totalVotes++;
                    }
                }

                //markup
                {{ totalVotes }}
                <button (click)="upVote()" >
                    Up
                </button>
//             => so we can this about this component in isolation => like a plain typescript class and not like an angular component
//             => we dont care the template => we look at the simple typescript class
//             => the method upVote() is responsible to change the state of this class
//                  => we can call this method in the test => and then inspect the value of the totalVotes property
//                                                         => if property updates properly => means the method is working
//             => so, writing this test is very easy
//             => However => if there's a problem in the binding in the template for the component
//                        => we will not know until runtime
//                        => maybe we forget to bind the click event to <button> to upVote method => component is not gonna work properly
//                        => so here is when we use an Integration Test
//                  
// 2. Integration Test => We test the component WITH external resources(e.g file system, APIendpoints, database)
//                     => In Angular app => integration test means testing a component along with its template
//                                       => so instead of looking the class as a plain typescript class
//                                       => we look at it as an Angular component 
//                                          => this means we need to write our test in an angular environment
//                                          => so we need to instruct angular to compile the class(typescript) along with its template
//                                       => so this test require a little more code than a simple unit test
//                                       => because like we have to put this class in an angular environment
//                                          => we need to deal with modules, dependencies injections, so on
//                                       => However, we get more confidence about the functionality of our component
//                                       => if our component is using a Service to talk to and APIendpoint
//                                          => similar to Unit Test we want give it a fake implementation
//                                          => in some ways, this looks like Unit test and some developers that this is actually kind of unit test
//                                          => becase we still testing component in isolation => without real Service or real Router
//                    => now, we can write a few integration test for the component 
//                       => all test may pass 
//                       => however, when we run our app using like the end-user => app may still no work as we expect
//                       => because, we are looking at individual components => not the entire app as a whole
//                       => so here is when we use End-to-end Test

// 3. End-to-end Test => We test the entire applications as a whole
//                    => we simulate a real user => launch the app in the browser
//                                               => perhaps we loging with user and password
//                                               => click here and there, navigate to the target page
//                                               => click on the <button> => ensure totalVotes updates in the html properly
//                   => Benefits
//                          => we get a long more confidence about the functionality of our app
//                   => Drawbacks
//                          => are very slow => each test is going to simulate all the steps before of real user
//                          => are very fragile => a simple page in our html markup can easily break this test
//                                              => even if our app is working properly
// 

// So => Ideally we want to expense most of our time writing => Unit and Integration Test
//    => and write very few End-to-end test => only for the key functions of the app
//                                          => but we are not going to test all the edge cases with End-to-end test
//                                              => like something be null, be out of range, so on => we use Unit test for these scenarios
//