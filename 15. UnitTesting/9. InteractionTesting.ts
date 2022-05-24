// Focus on add() method

//--In todos.component.ts
// in add() => we created a newTodo object
//          => then we call service.add => to add to the server
//          => then if result is successful => we add that object in the this.todos property(array)
//                  => otherwise we display an error message 
// here we need to write 3 tests
// 1. We want to ensure that this component => is going to call the Server to save the changes
//    we want to make sure that service.add() is called
// 2. then we want to ensure that => if the result is sucessful 
//                                => that todo object is added in the this.todos property(array)
// 3. we want to ensure => if the server returns an error
//                      => we put that error in the this.message property

//-- In todos.component.spec.ts
// 1. it => should call the server to save changes when a new todo item is added
//       => spyOn => we dont want really call the server => Arrange part
//                => we want to ensure that service.add is called
//      => spyOn(service, 'add').and.callFake() => replace the add method in our service with the new method here
//                                              => the add method just takes a todo object, and returns an observable
//      => ...callFake(t => )                   =>t(todo) goes to => we need to return an observable
// =>...callFake(t => return Observable.empty();)=> we just call observable.empty() because we dont care about what is returned from the server in this test
//                                                  => just ensure that our add method of our service is called
//                                                     => remember on top import => 'rxjs/add/observable/empty';
//      => Act part => component.add()
//
//      => Assert part => we want to ensure that service.add() is called
//                     => spy = declare a variable and set to what is returned from spyOn function
//                     => expect(spy).toHaveBeenCalled() => this is how we can test if given method is called
//
// 2. it => should add the new todo returned from the server
//       => unlike the 1st test => instead of return Observable.empty
//                              => we return Observable.from([   ]) => here the response from the server includes only 1 object
//                              => return Observable.from( [{ id:1 }] ) => we can extract this into a separate variable
//                              => return Observable.from([ todo ]) => define a variable let todo ={ id: 1}
//      => unlike the 1st test => in the Assert part we want to ensure that this todo object returned from server is in our array
//                             => expect(component.todos.indexOf(todo)).toBeGreaterThan(-1) 
//      => this 2nd test there's a way cleaner to write => instead of using ..and.callFake() and define an arrow function
//                                                      => we can call ..and.returnValue()
//                                                      => and then pass to the argument of this method
//                                                      => the Observable.from([todo])
// 3. it => should set the message property if server returns an error when adding a new todo     
//       => unlike the previous tests => in this test we dont want to work with the todo object      
//                                    => instead of creating an observable from an array => returnValue(Observable.from([todo]))
//                                    => we want to create an observable from an erro => returnValue(Observable.throw())  => remember import this static method just like empty
//                                      => this method requires an error message => declare a variable let error = 'error from the server'
//                                      => ...returnValue(Observable.throw(error))            
//      => then  => component.Add() => Act part
//
//      => finally => expect(component.message).toBe(error);
//






//--todos.component.ts

import { TodoService } from './todo.service'

export class TodosComponent { 
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


//--todos.component.spec.ts

import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  it('should set todos property with the items returned from the server', () => {
    let todos = [1, 2, 3]
    spyOn(service, 'getTodos').and.callFake( () => {
        return Observable.from([ todos ]);
    });

    component.ngOnInit();

    expect(component.todos).toBe(todos) ;
  });

  it('should call the server to save changes when a new todo item is added',() => {
    let spy = spyOn(service, 'add').and.callFake(t => {
        return Observable.empty();
    });

    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todo returned from the server',() => {
    let todo = {id:1}
    let spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));

    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  
  it(' should set the message property if server returns an error when adding a new todo',() => {
    let error = 'error from the server'
    let spy = spyOn(service, 'add').and.returnValue(Observable.throw(error));

    component.add();

    expect(component.message).toBe(error);
  });



});



//--todo.service.ts

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class TodoService { 
  constructor(private http: Http) { 
  }

  add(todo) {
    return this.http.post('...', todo).map(r => r.json());
  }

  getTodos() { 
    return this.http.get('...').map(r => r.json());
  }

  delete(id) {
    return this.http.delete('...').map(r => r.json());
  }
}

