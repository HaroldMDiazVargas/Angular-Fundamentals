// Testing Property binding and Class binding
// We are going to test anywhere we have bindings => property, class, style or event bindings

//-- In vote.component.html
// 1. Ensure totalVotes property is render propertly => {{ total Votes }} (string interpolation) or property binding
// 2. Ensure apply highlighted class to the icon when upVote() => this is class binding
// 3. Ensure when click icon => upVote() is called and totalVotes is increased => this is event binding 

// Here we will write just the 1st and 2nd Tests

//-- In vote.component.spec.ts
// 1. it() => should render total votes
//         => lets set a couple of properties
//           => component.othersVote = 20
//           => component.myVote = 1
//         => now we should expect that we have => 21 in the template for this component
//         => like we see in --vote.component.html
//           => our totalVotes in render inside a <span> with class="vote-count"
//           => so we are gonna query the DOM => and get a reference to this element
//           => to do that => we use => fixture
//         => so => fixture.debugElement => this represent the root DOM element
//                                       => from here we can query(calling the query method)
//         => fixture.debugElement.query() => this methods takes a predicate
//                                         => this is basically a function that returns true if some condition is match
//                                         => with this function we want to trasverse the DOM and find the first element that matches a given criteria
//                                         => on top import => import { By } from '@angular/platform-browser'
//                                         => we have these methods:
//                                            => By.css('') => here we can pass a CSS selector
//                                            => By.directive() => if we have a custom directive an we want to find an element that has
//                                                                => that directive apply to it
//                                                                => instead of string we pass the directive type
//                                                                => e.x imagine VoterComponent is a directive => so pass (VoterComponent)
//                                         => so we want to find a element with class => By.css('.vote-count')
//                                         
//      => ficture.debugElement.queryAll() => this is same as query but returns ALL the elements that matches the predicate
//                                        
//      => now fot this example we save the result => let de = fixture.debugElement.query(By.css('.vote-count'))   
//        => this is the rapper around the native html element that we have in JS
//        => we can get this element from => de.nativeElement property 
//        => let el:HTMLElement = de.nativeElement; => with this we can get intellisense
//           => el. => with this we can see all the standard properties and methods available in the HTML Element class
//                  => we are interesting in:
//                     => el.innerText property => because here we are render simple text around the span => we use this property
//                     => el.innterHTML property => here we are not interesting, but sometimes we may wanna work with this property                       
//    => expect(el.innerText).toContain(21);
//    => expect(el.innerText).toBe(21); => this is more specific
//                                      => but, when in comes to string => better to check for the existence of something in a string
//                                                                      => instead of an exact match => will make our text fragile
//   => Remember => In the production app(outside this testing environment)
//               => angular regularly runs Change Detection algorithm => to update the corresponding DOM element
//               => But in testing environment => Angular is not running its Change Detection
//               => Tell explicitly to Angular => when to perform Change Detection
//                                             => for this just call => fixture.detecChanges()
//
// 2. it()  => should highlight the upvote button if I have upvoted
//          => component.myVote = 1;
//          => fixture.detectChanges();
// 
//          => Now to get a reference to the corresponding DOM element
//              => so we look for using the class ="glyphicon-menu-up"   
//              => let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
//              => we dont need to define el:HTMLElement = de.nativeElement 
//                  => because we just can check for the existing of the class using de debugElement object
//         => de. => we have properties like:
//                  => classes
//                  => attributes
//                  => styles
//                  => but we dont have properties for innerText or innerHTML( for this we need to get reference for native HTMLElement)
//         => expect(de.classes['highighted']).toBeTruthy();



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


