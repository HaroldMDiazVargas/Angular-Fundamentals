
//-- In user-details.component.ts
// If we see the implementation of ngOnInit => we subcribe to the .params property of this.route, which is an Observable
//                                          => and we're looking at the id parameter pass to this page
//                                          => if id==0 we navigate the user to the 'not-found' page 
//                                          => This is just a simplify example, in real world app instead of comparing id with 0, perhaps we use a Service(e.x UserService) 
//                                              => to get a user with a given id from the server and then if we can not find that user, we redirect to 'not-found' page
//
//                                          => but what matter here, is we need to learn how to work with this .params property or in other words we need to learn how to work with the ActivatedRoute class in our test


//-- In user-details.component.spec.ts
// it => should navigate the user to the not found page when an invalid user id is passed
//    => similar to the last test => we get a reference to the router using TestBed
//                                => we  put a spyOn this router to assert that navigate method has been called
//    => then, we want to pass a parameter to this component
//      => first we need to get a reference to the ActivatedRoute object passed to our component => let route = TestBed.get(ActivatedRoute);
//                                                                                                  => to get IntelliSense we add type explicitly because .get method return any
//                                                                                               => let route: ActivatedRouteStub = TestBed.get(ActivatedRoute) => early we configurate our testing module to replace ActivatedRoute
//     => so this => route. => we see a property called params.(Observable) => we see IntelliSense that all methods are used to read values from this Observable
//                                                                          => in other words, we do not have any methods to push a new value to this Observable
//
//--Tecnhique to push a value into an Observable and use it as a parameter passed to a component
// back into our implementation of ActivatedRouteStub => define a field => private subject = new Subject(); => Subject is a class define 'rxjs'
//                                                                                                          => this cass derivated from Observable, so it has all the capabilities we have in Observables
//                                                                                                          => however, it has additional features, methods we can call to push new values into Observable
//                                                    => define a method => push(value){} => inside the method => this.subject.next() => with this .next() we can push a value into this Observable
//                                                                                                             => this.subject.next(value);
//-- back in user-details.component.ts
// we are using .params property of this ActivatedRoute object, we are not using Subject
// we need to expose this Subject as a property called .params wich is an Observable
// 
//-- back to the ActivateRouteStub class => instead of declaring => params: Observable<any> = Observable.empty(); => as a public field 
//                                                               => we want to declare it as a public property as a getter
//                                                               => get params() {} => is a public property, looks like a method but is actually a property
//                                                                                  => inside the getter => return this.subject.asObservable();
//                                                                                  => so we expose this subject as an Observable to the outside world
//                                                                                  => and with this our component can use .params property like an Observable
//-- back to our test
//   => so we use => route.push({  id:0 }) => here we need to pass an object that has a property called id with value 0
//                                  => with this we push a new value into an observable and then back in our component like we have a subcription to this observable
//                                                                                          => so the code block will be executed, and like the id is 0 we should navigate the user to 'not-found' page
//  => Assertion => expect(spy).toHaveBeenCalledWith(['not-found']);
//                  => if we change 'not-found' to other path, we can see if our test fail








//--user-details.component.spec.ts

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { Observable, Subject} from 'rxjs';

import {Router, ActivatedRoute} from '@angular/router';

class RouterStub {
    navigate(params) {

    }
}
class ActivatedRouteStub { 
    private subject = new Subject();

    push(value){
        this.subject.next(value);
    }


    get params() {
        return this.subject.asObservable();
    }


    // params: Observable<any> = Observable.empty(); 

}

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

//   it('should create', () => {
    it('should redirect the user to the users page after saving', () => {
        let router = TestBed.get(Router);
        let spy = spyOn(router, 'navigate');

        component.save();

        expect(spy).toHaveBeenCalledWith(['users']);

    // expect(component).toBeTruthy();
  });

  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({  id:0 });

    expect(spy).toHaveBeenCalledWith(['not-found']);

  });

});




//--app.routes.spec.ts
import {routes} from './app.routes';
import { UsersComponent } from './users/users.component';

describe('routes', () => {

    it('should contain a route for /users',() => {
        expect(routes).toContain({ path:'users', component: UsersComponent}) ;
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




//-- app.routes.ts

import { HomeComponent } from './home/home.component';
import { TodosComponent } from './2-todos/todos.component';
import { UsersComponent } from './users/users.component'; 
import { UserDetailsComponent } from './3-user-details/user-details.component';

export const routes = [
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UsersComponent }, 
  { path: 'todos', component: TodosComponent },
  { path: '', component: HomeComponent },
];