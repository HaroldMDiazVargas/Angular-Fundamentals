
// Component that uses a Service to make calls to the backend

//--todos.component.ts
// we  have ngOnInit calling the service and get list of todos items
// we also have add() and delete() methods
// Only FOCUS on ngOnInit

// in ngOnInit method => we initialze the todos property(field)
//                    => by calling the service and get the list of todos items
//                    => we are callin service.getTodos() which returns => an Observable
//                                                                      => subscribe to it
//                                                                      => then initialize the todos property
// 

//--todos.component.spec.ts
// We want to call ngOnInit() method => then assert the todos property is initialized
// However we dont want to use this Service here => this service makes calles to the backend
//                                               => this is against the defnitiion of unit test(isolate component from external resources)
// So here => we want to give this component a fake service
//         => this service is not going to make backend calls 
//         => just this fake service return simple observables
// in describe() => define a => let service: TodoService
// in beforeEach() => initialize service => service = new TodoService()
//                                                    => but here in the constructor we need to pass an instance of Http Service in angular
//                                                    => but we wont pass this here, because constructor of this class
//                                                    => will require additional arguments => making our test set up very complicated
//                                                    => so just cheat it and pass null
//                    service = newTodoService(null)  => not really matter because we are not gonna use Http Service anywhere
//                                                    => we're gonna change the implementation of getTodos() in this service
//               =>initialize component => component = new TodosComponent(service)     
//
// There's also another approach in unit testing => components that use services
//                                               => instead of giving to component a real instance of the TodoService
//                                               => we give it a fake implementation => we call a Stop?(next section)
// Now write test:
// it => 'should set todos property with the items returned from the server'
//    => Arrange part => we want to change the implemnetation of our getTodos() method
//                    => to do that we use a function in jasmine called => spyOn()
//                                                                      => with this function we can put a spy on a method in a class
//                                                                      => with that spy we can check if that method has been called
//                                                                      => we can change the implementation of that method
//                                                                      => we can return different value or we can throw an error
//                                                                      => basically, with a spy we get control over a method in a class 
//                      => first argument of spyOn() => the object we want to put a spyOn
//                          => spyOn(service,) 
//                      => second argument => is name of the method in that object
//                          => spyOn(service, 'getTodos')
//                      => then=> spyOn(service, 'getTodos').and.callFake() => with this we can change the implementation of getTodos method
//                          => we know getTodos() is a method with not parameters and returns an Observable
//                          => so in callFake() => we need to pass a function with the exact same signature
//                          => ...callFake(() => return Observable; ) => remember import from 'rxjs/Observable'
//                          =>  import 'rxjs/add/observable/from' => this is to create an observable from an array
//                          => ...callFake( () => return Observable.from([ ]); )
//                          => we need to simulate the response that is returned from the server  
//                          => ...callFake( () => return Observable.from([ []  ]); ) the server will returned an array of todo items
//                          =>...callFake( () => return Observable.from([ [1,2,3]  ]); )  => we can use simple numbers, and is fine for this test
//                                                                                        => because we're not gonna test anything specific of todo items
//       =>...callFake( () => return Observable.from([ [{ id:1, title:'a',... }]  ]); )   => or if we dont like, we can add real todo objects 
//                                                                                        => but this is gonna add extra noise to our text and doesnt add any value
//      => so with this, when we call service.getTodos() => callFake() function is going to be called
//      => will replace the real implmentattion
//
//  => Act part => component.ngOnInit();
//
//  => Assert part => expect(component.todos.length).toBeGreatherThan(0) => this is one way to write this expectation
//                  => expect(component.todos.length).toBe(3) => this is one way more specific
//                  => even we can make it little more especific => we want to make sure what we have in component.todos property
//                                                               => is exactly what we get from the server => [1,2,3]
//                  => expect(component.todos).toBe(todos) => create a todos variable to set the array of todo items                                              


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
});



//--todo.servie.ts

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

