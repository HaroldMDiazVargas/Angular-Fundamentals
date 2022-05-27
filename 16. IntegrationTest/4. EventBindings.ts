
// Test around Event Binding

//--In voter.component.html
// we want a reference to <i> => clicked => ensure that totalVotes is increased

//-- In vote.component.ts
// In Unit Test => we wrote different tests:
//                  => if we have upvoted => ensure component is not going to increase
//                  => if we have not upvoted => ensure the totalVotes increase
//                  => if we have not upvote => ensure the raise event
// With Integration Test => we not repeat all the execution paths(already cover for our unit tests)
//                       => as long as we click <i> element => then totalVotes increased => Ensure that component is integrated with its tempalte propertly


//--In voter.component.spec.ts
// it() => should increase total votes when I click the upvote button
//      => reference to the DOM element
//          => let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'))
//      => we need to explicitly click this button
//          => button.triggerEventHandler('') => 1st argument is the name of our event
//                                            => 2nd argument is an object that represent additional data about the event
//                                              => in this case we dont need an event object, because click a button doesnt involve any additional data
//                                              => so we just pass null
//         => button.triggerEventHandler('click', null);
//
//    => expect(component.totalVotes).toBe(1);
//      => here we are writing this asserstion around directly=> component.totalVotes property
//      => another way is to write this assertion against <span> 
//      => but this is like redundant => because the 1st test that asserted this component => can render totalVotes in this element
//                                    => so ther's not need to repeat this again
//                                      => if we write assertion against <span> element => we have to use fixture.debugElement.query... => noisy
//                                                                                                                                      => doesnt add extra value
//     => always make sure to stay our tests => clean and maintainable
//                                           => treat them same as the production code

// Combine multiples Unit and Integrations Tests:
// 1st approach => Write all tests in the same .spec file
//              => in Unit tests work directly with the component and Integration tests work also directly with DOM element
//              => Is not good => then we have to go open down this file to see if we have write enough Integration Tests for this component
//                             => this is something that we can not get a report of, using the Coverage tool that comes with angular-cli
// 2nd approach => Write all Integration Tests in the standard spec file generated
//              => then => have a separate file => voter.component.unit.spec.ts
//                                                  => all Unit Test in this new file
//              => Easily to see what parts we have/not Covered



//--voter.component.spec.ts

import { VoterComponent } from './voter.component';
import {TestBed ,ComponentFixture} from '@angular/core/testing'
import { By } from '@angular/platform-browser'

describe('VoterComponent', () => {
    let component: VoterComponent;
    let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
        declarations:[VoterComponent]
    });

    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;

  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detecChanges();

    let de = fixture.debugElement.query( By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(21);
  });

  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detecChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highighted']).toBeTruthy();
  })

  it('should increase total votes when I click the upvote button', () => {
    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);

    expect(component.totalVotes).toBe(1);
  })

});




//--voter.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html',
  styleUrls: ['./voter.component.css']
})
export class VoterComponent {
  @Input() othersVote = 0;
  @Input() myVote = 0;

  @Output() vote = new EventEmitter();

  upVote() {
    if (this.myVote == 1)
        return;

    this.myVote++;

    this.vote.emit({ myVote: this.myVote });
  }

  downVote() {
    if (this.myVote == -1)
        return;
        
    this.myVote--;

    this.vote.emit({ myVote: this.myVote });
  }

  get totalVotes() {
    return this.othersVote + this.myVote;
  } 
}


//--voter.component.html
<div class="voter">
    <i 
        class="glyphicon glyphicon-menu-up vote-button"
        [class.highlighted]="myVote == 1" 
        (click)="upVote()"></i>
        
    <span class="vote-count">{{ totalVotes }}</span>
    
    <i 
        class="glyphicon glyphicon-menu-down vote-button"
        [class.highlighted]="myVote == -1" 
        (click)="downVote()"></i>
</div>

