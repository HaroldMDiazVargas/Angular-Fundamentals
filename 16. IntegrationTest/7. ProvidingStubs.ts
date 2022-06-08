// Test a component that uses a Router for navigation

//--user-details.component.ts
// when we click save button => we're going to take the user to the users page
// there're 2 ways to test this behaviour:
//  => 1st way => write an interaction test => we can write our test that ensures that the navigate method of the router is called witht the right arguments
//                                             => this.router.navigate([]) => we are testing the interaction of this component with one of its dependencies(with the router propertly)
//                                                                         => just like testing the interaction of a component with a service
//                                          => however, this does not guarantee that the navigation is going to work
//                                              => ex => we may forget to define a route for the path(argument) of this.router.navigate([])
//                                              => so we have to write another test to ensure we  have a route for this path => 2nd test
// => 2nd way => some delopers prefer to use a real route object => then ensure that routing is happening propertly
//            => instead of testing the interaction => the writing assertion against the current URL in the browser
//            => not good approach => - it tests the Router class in angular, is like writing a test for angular framework not for our app
//                                 => - this test will require a more set up code and is very error promp

//--user-details.component.spec.ts
// We have an error in our test even before writing any test => Error: No Provider for Router!
// This error happens on => fixture = TestBed.createComponent(UserDetailsComponent); => we can not even create an instance of this component
// To fix this Error => we have two options:
//                      - 1st way => Import Router module => this will make this test work with real router
//                                => we dont want this, because is going to add some complexity in our set up code => we have to register router, change declarations:[], and also this is very error prompt
//                      - 2nd way => create a fake router which we call a Stub => this a tecnhique we can use a lot of tests, not neccesarily related to routers
//                                => so any time, our component has dependencies and providing this dependencies is going to be complex => we can provide a fake implementation
//
// before describe() => we write => class RouterStub {} => here we create a dummy and lightweighted implementation of the router class in angular
//                                                      => we add navigate(params) {}  => gonna take some params  and leave implementation empty(dummy implementation)
//                                                      => we dont need to add all the other methods of the router class => here we added navigate method because we use it in our save() of our component
// now in the configuration of the testing Module =>  providers: [] => here we tell angular to replace the router class with our router stub                                                
//                                                                  => previously we just added a name of a class here and this will register this class as a provider e.x providers[ Router ]
//                                                                      => but now we are gonna supply an object, this object needs 2 properties:
//                                                    providers:[{provide:Router}] => 1st property is provide => we add the Router class => remember import it on top from '@angular/router'
//                                                      ...provide:Router, useClass:RouterStub => 2nd property is useClass => we add RouterStub 
//                                                => with this we tell angular when it sees Router as one of the parameters of the constructor of our component
//                                                  => it should create an instance of the RouterStub class
//
// If we see the constructor of component => (private router: Router, private route: ActivatedRoute)
//                                        => when running our test angular is going3 to supply instance of RouterStub instead of Router.
//                                        => the 2nd param(ActivatedRoute) => similarly we should create a Stub for the ActivatedRoute
// 
// class ActivatedRouteStub {} => in component.ts we are using .params property of ActivatedRoute => this .params is an Observable and is the only member we have used, we need to add it to our Stub
// class ActivatedRouteStub { params: Observable<any>; } =>  remember import on top Observable
// class ActivatedRouteStub { params: Observable<any> = Observable.empty(); } => we need to initialize to an empty observable to avoid error in test

// now in the configuration of the testing Module => providers:[ 
//                                                  {provide:Router, useClass:RouterStub},
//                                                  {provide: ActivatedRoute, useClass: ActivatedRouteStub}   => rember import ActivatedRoute class from '@angular/router'
//  ]
//

// Test => now we can create an instance of the UserDetailsComponent






//--user-details.component.spec.ts
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { Observable} from 'rxjs';

import {Router, ActivatedRoute} from '@angular/router';

class RouterStub {
    navigate(params) {

    }
}
class ActivatedRouteStub { 
    params: Observable<any> = Observable.empty(); }

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers:[
          {provide:Router, useClass:RouterStub},
          {provide: ActivatedRoute, useClass: ActivatedRouteStub},
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






//--user-details.component.ts

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p['id'] === 0)
        this.router.navigate(['not-found']);
    });
  }

  save() { 
    this.router.navigate(['users']);
  }
}





//--user-details.component.html

<p>
  user-details works!
</p>
<p>UserId: {{ userId }}</p>
<button (click)="save()">Save</button>