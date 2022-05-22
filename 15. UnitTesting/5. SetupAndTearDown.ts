// Testing Angular Components

// We're gonna see a pattern that we see in a lot of real world apps

//--vote.component.ts
// In this class we have => property totalVotes
//                       => methods that modify this field
// the pattern that we have here is => state change => in a lot of components we have methods that modify the state of the component
// In a real world scenario => chances are => after modify the state 
//                                         => we may use a Servie to make an API call => to save changes on the Server (this is a different pattern)
// For now => focus only on the state change pattern

//--In vote.component.spec.ts
// write a spec => it() => 'should increment totalVotes when upvoted'
//                      => then create instance of the component    => Arrange => we initialize the system of our test
//                      => call the upVote() method                 => Act => often involves calling a method or function
//                      => expect to Be => 1                        => Assert => Assertion
//                      => these 3 lines of code represent a structure we see in a lot of unit tests
//                          => Arrange Act Assert
//                          => as a best practice put a vertical line between these 3 lines(space)
// write 2nd spec => it() => 'should decrement totalVotes when downVoted'
//

//--refactoring component initialization
// we see that our two tests have something in common:
//                                              => initialization of VoteComponent
//                                              => here, is just 1 line of code => not a big deal
//                                              => but sometimes with more complex objects => the initilization can involve a few lines of code
//                                              => we can refactor these tests => move initilization to single place to avoid duplication
//So => if we move the initialization of the VoteComponent to the body of suite:
//       => the 2nd test is going to fail => because the expect will not be -1
//                                        => because the 1st test modified the property totalVotes
//      => this problem is our test outside effect => the execution of one test can impact the execution of other test
//                                                 => with this our test is going to break often => very fragile
//                                                 => so we want to star with a clean state
// When writing Automated Test => remember each test should run in an isolated world
//                             => as if is the only test exist in the world

//--Solved refactoring component init using beforeEach function
// To solve the problem of initialization of componet => use forEach() function defined in Jazzman(?)
//                                                    => argument pass a function(arrow function)
//                                                      => this arrow function is going to be call before each test
//      
// In Jazzmin we have another 3 functions similar to beforeEach():
// => beforeEach() => function will be call before each test
//                 => we refer what we write here as =>  SET UP
// => afterEach() => same signature => function will be call after each test
//                                  => used to do clean up 
//                => we refer what we write here as => TEAR DOWN
// => beforeAll() => function will be call once before all tests
// => afterAll() => function will be call once after all tests

//


//vote.component.ts


export class VoteComponent { 
    totalVotes = 0; 
  
    upVote() { 
      this.totalVotes++;
    }
  
    downVote() { 
      this.totalVotes--;
    }
  }
  



//vote.component.spec.ts

import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {

    let component : VoteComponent;   // To add IntelliSense  

    beforeEach(() => {
        component = new VoteComponent();     
    });
     

  it('should increment totalVotes when upvoted', () => {
    //   let component = new VoteComponent();                  //Arrange 

      component.upVote();                                   //Act

      expect(component.totalVotes).toBe(1);                 //Assert
  });

  it('should decrement totalVotes when downvoted', () => {
    // let component = new VoteComponent();                  //Arrange 

    component.downVote();                                   //Act

    expect(component.totalVotes).toBe(-1);                 //Assert
  });
});
