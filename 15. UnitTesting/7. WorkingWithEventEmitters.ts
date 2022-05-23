
// Component use an event emitter

//--vote.component.ts
// voteChanged property => is an event emitter
//                      => often we used event emitter => as an @output property in angular components
//                      => but in this section lets not worry about this decorator because we are not working with templates
// when upVote() is call => our component should raise an event called voteChanged
//                       => and in the event data(argyment of .emit ) => we should have the totalVotes

//--vote.component.spec.ts
// in the beforeEach() => initialize the component
// test =>
//       it => 'should raise voteChanged event when upVoted'
//          => component.voteChanged => this is an event emitter
//                                   => and remember event emitter are Observables
//                                   => we can subscribe to that and then get the event that is raised
//          => component.voteChanged.subscribe( tv => ) => in the event we have the totalVotes(as a tv)
//          => so define a variable an set it to null => then when we get from the event => set the variable to what we get from this event
//          => component.voteChanged.subscribe( tv => totalVotes = tv) => Arrange part
//  
//          => component.upVote() => Act part
//
//          =>expect(totalVotes).not => this is a property of expect 
//                                   => . and we have all the function we have seen so far: toBe, toBeFalsy, toBeTruthy, so on
//          => expect(totalVotes).not.toBeNull(); => Assertion part
//                                                => this is a little be generic
//                                                  => sometimes we prefer to be a little be more specific
//                                                  => because there may be a bug in our component that put a set totalVotes in the event   
//                                                  => may be set a different value
//                                                  => with this assertion out test still pass even we have a bug in our component
//         => expect(totalVotes).toBe(1); 
//
//So this is how we test Output properties (event emitters)





//--vote.component.ts


import { EventEmitter } from '@angular/core'; 

export class VoteComponent { 
  totalVotes = 0; 
  voteChanged = new EventEmitter();

  upVote() { 
    this.totalVotes++;
    this.voteChanged.emit(this.totalVotes);
  }
}


//--vote.component.spec.ts

import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {
  var component: VoteComponent; 

  beforeEach(() => {
    component = new VoteComponent();
  });

  it('', () => {
    let totalVotes = null;
    component.voteChanged.subscribe( tv => {
        totalVotes = tv;
    })

    component.upVote();

    expect(totalVotes).not.toBeNull();
    expect(totalVotes).toBe(1);
  });
});