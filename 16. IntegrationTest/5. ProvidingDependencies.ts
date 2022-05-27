// Example of component that uses a dependency

//--todos.component.ts
// we can see the constructor expect => TodoService
// In Unit Test => we provided this dependency directly when creating an instance of TodosComponent
//              => But this approach not work when writing Integration Test
//              => In Unit Test => we used => new TodosComponent(new TodoService)
//                                         => then later we change the implementation adding a spy on 1 or more methods on this object
//              =>  In Integration Test => we are not 'newing' a TodosComponent
//                                      => instead we use => TestBed.createComponent(TodosComponent)

//--In todos.component.spec.ts
// Import => import{ TodoService } from './todo.service'
// in beforeEach() => we register the TodoService as a provider in our TestingModule
//                 => ...TestingModule({ providers: [TodoService] })
// Our TodoService is using the Http Service of Angular
//  => we need to import Http Module => on top => import{HttpModule} from '@angular/http';
// 
// back in beforeEach() => in our metadata object:
//                      => ...TestingModule({... imports:[HttpModule]});
//
// So this way we provide Dependencies when writing Integration Tests
//



//--todos.component.spec.ts

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';

import{ TodoService } from './todo.service';
import{HttpModule} from '@angular/http';
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


//--todo.service.ts

import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TodoService { 
  constructor(private http: Http) { 
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


