// Test the navigation

//--In user-details.component.spec.ts
// change it('should create') => and test the navigation
// TEST1
// it => should redirect the user to the users page after saving
//
//      
// Arrange part => let spy = spyOn()  => add a spy on the navigate method of the router  
//                                    => we need to pass a reference to this router => so let router = TestBed.get(Router);
//              then => let spy = spyOn(router, 'navigate') => put the spy on the navigate method
//                                                          => we dont need to call .and.callFake or returnValue => because this method is already a fake method
//                                                          => we just want to ensure that it has been called
// Act part => component.save();
//
// Assert part => expect(spy).toHaveBeenCalledWith(['users']); => take the user to the users page 
//                                                             => this is the object we should pass to the navigate method

// Test => passed

// Tecnhique to ensure that the test is testing the right thing => is not lying:
//--In user-details.component.ts
// if we comment => this.router.navigate(['users']) => inside the save() method 
//               => the test should fail

// 
// TEST2
// we want to ensure that we have a route configurated for this path
//-- In app.routes.ts
// here we export a constant array called routes 
// we can simply write a Unit Test => to ensure that in this array we have a route for the users page

// create a new file in app/ folder => app.routes.spec.ts
//--In app.routes.spec.ts
// simple Unit Test outside the angular environment
// test => describe('routes', () => {
//          it  => should contain a route for /users   => in terms of naming has the same name => should contain a route for ... => then the name of path and sort alplhabetically
//              => expect(routes).toContain({ path:'users', component: UsersComponent}) => here we need the route for this path(users)
//                                                                                      => and this should be associated with UsersComponent
//                                                                                      => remember import on top => { routes } from './app.routes'
//                                                                                                                => { UsersComponent  from './users/users.component' }
//})


// Test => passed

// Ensure this TEST2 is testing the right thing => we can go to  app.routes.ts => and comment { path: 'users', component:UsersComponent }, => this line
//                                                                             => we have a broken test
// so if in the future => we accidentally comment this line or make change cost the app to break => this last test will catch the Bug =>  So we can write hundreds or thousand tests before releasing our app to make sure 
//                                                                                                                                         all parts of our app are behaving as we expect







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

//   it('should create', () => {
    it('should redirect the user to the users page after saving', () => {
        let router = TestBed.get(Router);
        let spy = spyOn(router, 'navigate');

        component.save();

        expect(spy).toHaveBeenCalledWith(['users']);

    // expect(component).toBeTruthy();
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
    this.router.navigate(['users']);  // Comment this line to see if test1 break
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
  { path: 'users', component: UsersComponent }, // Comment this line to see if test2 break
  { path: 'todos', component: TodosComponent },
  { path: '', component: HomeComponent },
];