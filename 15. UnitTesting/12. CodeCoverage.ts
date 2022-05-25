// Code coverage

// As we write test for our app => we need to know how much our code is covered with test
// In terminal => when run => ng test => we pass a parameter
//                                    => ng test --code-coverage => with this parameter we get a new folder coverage/
//                                                               => this folder gives us a repor of how much our code is under test

//-- In coverage/index.html
// open this index.html in browser 
// we get a report:
// - on top => we can see a summary of code coverage xx% Statements on the test
//          => xx% Branches => wich means if/else blocks or execution paths
//          => xx% Functions 
//          => xx% Lines of code
// -below summary => we can see a break down of code coverage based on the folders and files

//--In services/todos.component.spec.ts
// ex => disable a couple of test  
//    => to disable a test => put 'x' before the 'it' function => e.g => xit('should...', () => )...
//    => we also can disable an entire suite => adding 'x' before 'describe' function => xdescribe..
//    => in terminal test => we can see number of tests skipped
//    => and if refresh coverage/index.html => we can see below summary => xx% of folder where is the tests we disables => xx% covered

//-- In coverage/index.html
// we can see a closer look => in a particular folder
// we can see ex => 2 files => ..ts and ..service.ts 
//              => we can see the xx% coverage of our files
//              => if we click over a file => we see a red lines highlighted
//                                         => these are lines are not convered in our test
// in recap => we can track how of our code is covered with test

// ¿Ideal number of Code Coverage?
// Ideally should be 100%
// But remember => depends time and budge of the project
// However => is good to have 70% of code coverage
// if limitations => focus on critical part of our app => test
//               => write test for methods with complex logic => specially methods with multiple execution paths that take longer to test manually

