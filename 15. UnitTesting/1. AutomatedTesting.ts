// What is Automated Testing

// Automated testing is basically to practice of writing code to test our code 
// then run those tests in an automated fashion

//ex
// imagine we have this function somewhere in our app
// basic calculate function => takes an input
//                          => depending of some conditions return different values
// with Manual Testing => we have to launch the app on the browser
//                     => perhaps we have to log in first => few clicks to get to the target page
//                     => then enter values into a few form fields
//                     => so eventually this function is called
//                     => This is very time consuming => this cycling to execute this function in manual fashion

// with Automated Testing => we can write code and directly call this function with different inputs
//                        => then we can runthis code in an automated fashion
//                        => this may take only a fraction of second to test this function with different inputs
//                        => with this practice we can test => a lot parts of our app functionality
//                                                          => and maybe the entire app in an automated fashion
//                                                          => several times faster than manual testing
// maybe people say => writing all these tests are time consuming
//                  => because not only do we have to write the app code => which is the production code
//                  => but we also have to writethe test code
//                  => so, implementing a new feature with test => will take significantly more time as suppose to implement without test
//                                                              => increase the development cost
//                                                              => because a part of development time spent on writing and maintain this test                                                                
// Lets say we dont have any automatic test
// => as we add new features => and our app grow in complexity
//                           => time required to test all the app functions, the various arguments
//                           => increases exponentically 
//                           => if we work in a large app with a lot of features have been built over years
//                               => sometimes none in the team knows how these functions work and how they should be tested
//                               => nobody knows the requirements
//                               => because those developers initially created these features are not longer part of company
//                               => so ther're a lot of legacy functions around and nobody dares to touch them
// Lets say we implemented automatic testing
// => we can test a large part of app functionality => using automated test
// => and the time required to do manual testing => will be fairly less
// => in fact some companies do not have any manual testing at all => they automated everything
//                                                                 => wheter is a good practice or not => is debatable
//                                                                 => respect of that => some level automated testing can definitively reduce the manual testing effor
// But there's also 1 more benefit of automatic testing
// => with automated test => we can catch defects before releasing your software
//                        => this can save us a lot of nightmare => where deploy app to production everything good
//                                                               => then 30min later is not working
//                                                               => spend several hours trying to fix the bug
//                       => so with automated test we can catch more bugs before realeasing our app into production
//                        => we release often software of better quality
// But Be Pragmatic
// => the reality if that => even automated testing has a lot of benefits
//                        => it does not feed every project and every team
//                        => for starter => our team needs a discipline in writing clean test and maintain them
//                                       => if we dont work in a team like that => writing automated test ends costing more than the value we get of them
//                                                                              => because we spend a lot of time fixing broken tests that are hard to read and hard to understand
//                                                                              => in those cases is better not to write test a lot
//                       => another factor is the time and budge of our project
//                          => lets say we have 3 months to turn a concept into real working software
//                          => in this situation => we should not our time writing test initially
//                                               => because we dont know if this app/busineess is going to success
//                          => most companies have small budges => want to produce something quickly
//                                                              => they can show it to a match audience
//                                                              => then atract rental capitalist to raise funds
//                         => if we want to spend 3 months writing test
//                             => chances are our app may not even make to the production
// => In a lot starter companies => the requirements change frequently
//                               => if we spend a lot of time writing tests
//                               => a lot of these tests break as we modify the app code to implement the new requirements
//                               => so for these projects is better to write tests only
//                                   => for parts of the app that will take more time to test manually
//                               => so we use it as a practice to help us to increase our productivity and go faster
//                                  => instead of hard and fast rule we need to apply everywhere
// Remember => in real world is different from courses and books
//          => in real world we have constrains => most of the time these constraints are money and time
//          => we dont have to code forever o for fun
// Our job => is to build real working software and solve a problem
//         =>  deliver a value to the world
//         => if we can not deliver working software in time within the budge
//             => nobody cares about our fancy automated test
//         => remember be pragmatic => and use only automated test when it make sense
//         



 function calculate(input){
     if(x) return ...;
     else if(y) return ...;
     return ...;
 }