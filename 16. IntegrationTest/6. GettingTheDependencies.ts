
// In the last section, we wrote a unit test around ngOnInit() method. However, this method is one of those cases that is better to be tested using Integration Test
// Because this method is called automatically by Angular at the time this component is initialized. This will happen only if we have implements(interfacr)  the ngOnInit method in the component
// In other words, if we accidentally forgot implements OnInit, we wont have any error and ngOnInit method is just a simple method in the class
// Angular is not going to call this method. Unit Test will pass, but the component is not going to work.
// We need to write an Integration Test for this method

// Integration Test
// in the integration test => we need to get a reference to our dependency => the Service
//                         => then we need to change the implementation of getTodos() method
//--todos.component.spec.ts
// it() => should load todos from the server
//      => we need to get a reference to that server dependency
//          => 1st way(simple) => we can get it from the TestBed => TestBed.get(TodoService) => this provide a reference to our Service that is injected in our component
//                                                                                           => this works if we have provided that dependency at the module level
//                                                                                               => in our app.module.ts we register our dependency at the module leve in providers:[]
//                                                                                               => when we provide a dependency here => Angular will create only a Single Instance of that dependency at the module level
//                                                                                                  => this is called Singleton, is a good approach for most of the scenarios out there
//                                                                                                  => however, we may have an scenario where we prefer to have a separate instance of that service/dependency per component
//                                                                                                  => fot this last case, instead of register at module leve, we register at the component level
//                                                                                                      => in component.ts => in @Component metadata => providers :[] (specific for this component)
//                                                                                                      => so if we have multiple instances of this component on 1 page, each instance will have its own dependency
//                                                                                                  => in this situation we can not get dependecy from TestBed => returns the dependencies that are register at module level
//                                                                                                  
//         => 2nd way => we can use fixture.debugElement.injector.get(TodoService) => this is to get a dependency from the component directly
//                                                                                 => this approach is little more verbode(noisy)
//    => then we need to change the implementation of getTodos() method uing spy => spyOn(service, 'getTodos').and.returnValue() => remember import on top {Observable} from 'rxjs'   (without /Observable) 
//                                                                                                                               => this is lightweight Observable,to avoid import all operators(optimization tecnhique for production)
//                                                                               => spyOn(service, 'getTodos').and.returnValue(Observable.from([ 1,2,3])) => add the response that is returned from the server                                                                                                               
//                                                                                                                                                        => imagine is an array of 3 items
//    => Assertion => expect(component.todos.lenght).toBe(3) or we can be more specific
// 
// Test failed => because the fixture.detectChanges() is in beforeEach() => automatically generated whe we use angular-cli to create component
//                                                                      => after we create the component when we call  fixture.detectChanges() => angular calls ngOnInit()
//                                                                                                                                             => at this point our Service is already called is to late to  change implementation 
//                                                                                                                                                 => of getTodos() to return a hard-code array
//            => so we remove this line => once we change the implementation of our Service(after spyOn) => we call   fixture.detectChanges()   



//--todos.component.spec.ts

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';

import{ TodoService } from './todo.service';
import{HttpModule} from '@angular/http';
import {Observable} from 'rxjs';
//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],                     //Provide dependencies
      providers: [TodoService],
      imports:[HttpModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos from the server', () => {
    let service = TestBed.get(TodoService);
    spyOn(service, 'getTodos').and.returnValue(Observable.from([ 1,2,3]));

    fixture.detectChanges();

    expect(component.todos.lenght).toBe(3);
  });
});


//--todo.service.ts

import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService { 
  constructor(private http: Http) {  all
  }

  add(todo) {
    return this.http.post('...', todo).map(r => r.json());
  }

  getTodos() { 
    return this.http.get('...').map(r => r.json());
  }

  getTodosPromise() {
    return this.http.get('...').map(r => r.json()).toPromise();
  }

  delete(id) {
    return this.http.delete('...').map(r => r.json());
  }
}


//--todos.component.ts

import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message; 

  constructor(private service: TodoService) {}

  ngOnInit() { 
    this.service.getTodos().subscribe(t => this.todos = t);
  }

  add() { 
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  } 
}


//--todos.component.html

<p>
  todos works!
</p>
