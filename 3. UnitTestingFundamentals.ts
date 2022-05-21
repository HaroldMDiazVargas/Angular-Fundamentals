// Unit Testing 

// First we need to know that => Test are first-class citizens
// So => all the practices we have learned about writing clean and maintainable code
//    => apply to our tests as well

// Examples of Clean Coding Practices 
// - Our functions/methods are small => 10 lines of code or less
// - Proper naming of functions/methods/class
// - Single responsibility
// These same principle apply to our tests:
// Each test should be => 10 lines of code or less
//                     => proper name => describe perfectly what is doing
//                     => single resposibility => test only one thing

// If you copy and paste a project 
//  => remember run => npm install

//Now, when you have an angular project:
// in terminal => run => ng test
//                    => this will buld the app and then launch Karma => which is our test runner
//
// 1st Unit Test
//--compute.ts
// if we give to function => negative number returns 0
//                        => otherwise increment number by 1
// to create a Unit test for this function => create a new file => compute.spec.ts
//                                                              =>all our test files should have .spec.ts
//                                                              => this is the pattern Karma is looking for => to run the test

//--in compute.spec.ts
// In projects we created using angular-cli => we used Jazzman as our testing framework
//                                          => which provides a bunch of functions that we use to write tests                                                                 
//                                          => the most functions that we used are:
//                                          => decribe() => use to define a suite
//                                                          => suite is a group of related tests
//                                          => it() => use to define a spec or a test
// So define => describe() => we give our suite a name
//                         => which is often the name of the system of our test
//                         => in this case we are writing the test for our compute function
//          => describe('compute',) => the 2nd argm is the function that our test runner is going to call
//          => describe('compute', function({ })) => we can use this syntax 
//          => describe('compute', () => {} ) => or arrow function syntax is more cleaner
//                                => in this function we can have 1 or more tests or specs
//                                => to define a test or spec => we call the it() fucntion
//          () => {  it('test name',() = >  ) } => similarly we give a test name as 1st arg and a function as 2nd argm
//                                              => and in that 2nd argm(arrow function) is the body of our test
//                                              => and the test runner is going to call this function => then tell us if test sucess or not
//                                              
// If we see the implementation of the function compute() => when writing test in this function
//                                                        => we need to test all executions paths
//                                                        => in this function we have 2 execution paths:
//                                                           => One path is for negative number
//                                                           => the other is for positive number
//                                                        => so we need to write 2 tests
// So on describe() => we need to name it() properly
//                  =>it('should return 0 if input is negative', () => {}) => we can read that name as the spec of the compute function
// To test this => import on top function => import { compute } from'./compute'
//
// Son on describe() 
//                  =>it('should return 0 if input is negative',
//                    => () => {const result = compute(-1);}) => call the function with -1
//                                                            => we need to assert that this result is 0
//                                                            => we call the expect() that comes with jazzman
//                          => expect(result).toBe(0);  => this is the API that comes with jazzman
//                                                      => we have bunch of others methods here .toBeDefined()
//                                                                                              .toBeFalsy()
//                                                                                              .toBeGreaterThan()
//                                                                                              .tobeLessThan()
//                                                                                              . so on
//                                                     => depending of what we are going to expect => we call one of these methods
// Now => because Karma is watching our test and source files
//     => as soon as it detects a change => it runs the test again
//     => so on terminal => we can see => :Executed 1 of 1 SUCCESS => if we have bigger screen we can see this or dedicate 1 monitor to tests
//     => if we dont like this terminal windows => when we run ng test => it launch browser windows connected to Karma
//                                                                     => if we click to Debug button
//                                                                          => then open DevTools => console tab see list of test 
// Make another => it() => to define the test or spec for the 2nd path of the function
//                                                                  
//
//


//compute.ts
export function compute(number) {
    if (number < 0)
      return 0; 
  
    return number + 1;
  }
  


// compute.spec.ts

import {compute} from './compute'

describe('compute', () => {
    it('should return 0 if input is negative', () => {
        const result = compute(-1);
        expect(result).toBe(0);
    })

    it('should increment the input if it is positive', () => {
        const result = compute(1);
        expect(result).toBe(2);
    })

} )