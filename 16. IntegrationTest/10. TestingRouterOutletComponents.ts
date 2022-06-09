// Exanoke of a component that uses a RouterOutlet

//--In app.component.html
// we have a <nav> element with 1 link 
// below this element we have a <router-outlet>
// we want to write 2 tests:
//  1st test => to ensure we have this <router-outlet> element here
//  2nd test => for each link in the <nav> we want to ensure => that link is set up propertly
//  These tests matter, because if in the future => we accidetanly comment <router-outlet> element => 
//                                               => or make a type like <rsrouter-outlet> => we dont have to run the app to find this issue            
// So with Automated Test we can catch bugs before releasing our apps
// so if our app is not behaving as we expect => these tests are gonna tell us more faster

//--In app.component.spec.ts
// TEST1
// it => should have a router outlet
//    => we need to get a reference to <router-outlet> element 
//       => let de = fixture.debugElement.query(By.directive(RouterOutlet)); => import on top {RouterOutlet} from '@angular/router';
//    => expect(de).not.toBeNull();  
//
// Test => failed => 'router-outlet' is not a known element
//                => because the RouterOutlect directive is defined in the RouterModule
//      --In app.module.ts
//         imports:[] => here we RouterModule.forRoot(routes) => we import the RouterModule and give it our routes
//                                                            => so we need to do something similar in our TestingModule
// in TestBed.configureTestingModule({
//        imports: [RouterTestingModule], => instead of RouterModule we use a different module => RouterTestingModule (import on top)
//                                        => this is a router module specific designed for testing env, is a little bit simplify and decoupling from the browser
//                                        => we need to call .withRoutes([]) => here we git it an array of the routes
//                                                                         => we can simply pass an empty array here, does not really matter
// })
//

//TEST2
// it => should have a link to todos page
//    => we can use the tecnhique we show here for testing any components that use the routerLink directive, not just app.component
//    
//    => we get a reference to this element => let de = fixture.debugElement.query(By.directive(RouterLinkWithHref)); => import on top from '@angular/router'
//      => but we dont want to use the .query method, because the todos link is not neccesarily the first element that has this routerLink directive applied to it
//      => so we use => let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref)); => with queryAll we get all elements as an array
//   => Now we get the index of the target element of this array => if is greater than -1, means we have the element in this 
//      => let index = debugElements.findIndex() => here we have to pass a predicated//
//                                               => de => de. => here we put our condition
//                                                                 => we've seen this de has properties like => attributes, classes, styles, properties, so on
//                                                              de.attributes['href'] => we may think this is the case, but for some reason this is not this way
//                                                              de.properties['href'] =>  so this properties is an Object
//                                                              de.properties['href'] === '/todos' => we want to know if in this object we have a key call 'href' and its value is '/todos' 
//  => Assert => expect(index).toBeGreatertThan(-1);

//





//-- app.component.spec.ts

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppComponent } from './app.component';


import {RouterOutlet, RouterLinkWithHref} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it(' should have a router outlet',() => {
    let de = fixture.debugElement.query(By.directive(RouterOutlet));

    expect(de).not.toBeNull();  
  });

  it('should have a link to todos page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de =>  de.properties['href'] === '/todos');

    expect(index).toBeGreatertThan(-1);

  });

});





//--app.component.html
<nav>
  <a routerLink="todos"></a>        // change to "todos!!!" see if test fail
</nav>
<router-outlet></router-outlet>     // add something weird to <asrouter> to see if fail




//--app.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}




//--app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router'; 

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TodosComponent } from './2-todos/todos.component';
import { UserDetailsComponent } from './3-user-details/user-details.component';
import { VoterComponent } from './1-voter/voter.component';

import { routes } from './app.routes';
import { UsersComponent } from './users/users.component';
import { NavComponent } from './nav/nav.component';
import { HighlightDirective } from './highlight.directive'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodosComponent,
    UserDetailsComponent,
    VoterComponent,
    UsersComponent,
    NavComponent,
    HighlightDirective
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }




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