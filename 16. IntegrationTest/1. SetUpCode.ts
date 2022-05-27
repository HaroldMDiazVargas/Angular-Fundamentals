
//--In voter.component.ts/html
// this is a voter component

//--In voter.component.spec.ts
// in beforeEach block => we need to create an instace of the voter component
//                     => but in Integration Test we dont new up => voter component like e.g new VoterComponent()
//                                                               => this is for writing Unit Test
//                     => we need to ask angular to create an instance to that component for us
//                     => On top => import { TestBed } from '@angular/core/testing' => this class provides a number of utility methods
//                     => so we will create a dynamic module => put our component in that module
//                                                           => just like we put our components in a module in real world app
//                     => so we call => TestBed.configureTestingModule({}) => this methods takes a metadata object
//                                                                       => similar to the one we provide to NgModule(app.module.ts)
//                                                                          => e.x declarations:[], providers:[].. => these are metadata objects
//                                                                       => so here, we'r gonna use declarations:[]
//                                                                       => because we dont need to import:[] other modules or providers[] for dependency injections
//                                                                          => because this is a very simple component     
//                                                                       => so we put our component in this module => declarations:[VoterComponent]
//                                                                       => so thats how we create a dynamic testing module
//                   => in order to create an instance of this component => TestBed.createComponent() => the argument to this method is the type of our component
//                                                                                                      => so just => VoterComponent
//                                                                                                    => the return type is  ComponentFixture<VoterComponent>
//                                                                                                      => is not an instance of our component
//                                                                                                      => ComponentFixture is a rapper around our component instance
//                                                                                                      => with that we can get acces to both: our component instace
//                                                                                                                                          => as well as its template
//                 => on top => import {ComponentFixture} from '@angular/core/testing' => to add intellisense to this type object
//
// in describe() code block => we define a couple of variables => let component: VoterComponent;
//                                                              => let fixture: ComponentFixture<VoterComponent>;
// in beforeEach block => we are gonna set => fixture = to TestBed.createComponent(VoterComponent)
//                     => then  from fixture we can get the component instance => fixture.componentInstance;
//                        => component = fixture.componentInstance;
//                     => fixture has another property called => .nativeElement
//                                                              => this property returns an HTML element(root DOM element for this component template)
//                                                            => .debugElement
//                                                               => this is a rapper around native element
//                                                               => we can get some useful methods for querying the DOM
//                    => so recap => ComponentFixture class is a rapper around the component
//                                =>  so we can get => instance of the component
//                                                  => its DOM element
//                                                    => by native element property
//                                                    => or by debug element property
//                                                  => run change detections manually
//                                                  => get 1 or more of the injected dependencies in this component
//        






//--voter.component.spec.ts

import { VoterComponent } from './voter.component';
import {TestBed ,ComponentFixture} from '@angular/core/testing'

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

  it('', () => {
  });
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

