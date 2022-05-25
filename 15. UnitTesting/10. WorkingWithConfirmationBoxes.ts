// Focus on delete(id) method

//--In todos.component.ts
// in delete(id) => we are displaying a confirmation box
//             => if the user confirms => call the server to delete this todo item
//             => and if not => the server should not be called

//--In todos.component.spec.ts
// we need to write 2 tests:
// 1. Make sure if the user confirms in the confirmation box
//    we are going to call the server to delete the todo item
// 2. Make sure if the user presses the cancel button in the confirmation box
//    we are not going to call the server to delete the todo item


// 1. it() => should call the server to delete a todo item if the user confirms
//         => Apart from checking the implementation of our service
//             => we also want to check the implementation of windows.confirm() method
//             => because we dont want to display a confirm box and run a unit test
//        => spyOn(window, 'confirm').and.returnValue(true);  => if user confirms we want to call the server
//        => spyOn(service, 'delete').and.returnValue(Observable.empty()) => here we just want to return an empty observable
//                                                                        => because we dont really care about what is returned from the server
//       
//       Act part => component.delete(1); => 1 is an id
//      
//      Assertion part => we want to ensure that the delete method of our service is called
//                     => so declara a variable => let spy = spyOn(service..).. => in the return spyOn about the service
//                     => expect(spy).toHaveBeenCalled() => this is one way, is a little bit general
//                     => we want to make sure => if we pass 1 in the Act part(id)
//                                             => this value is going to the delete method of our Service as well
//                     =>expect(spy).toHaveBeenCalledWith(1) => we are make sure, that we dont accidentally
//                                                           => passing a different id to our service
//
// 2. it => should NOT call the server to delete a todo item if the user cancels
//       => unlike the 1st test => we chage spyOn(windows,'confirm')...returnValue(false) => change to false
//       => unlike the 1st test => we change expect(spy).not.toHaveBeenCalled()








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


  it('should call the server to delete a todo item if the user confirms',() => {
      spyOn(window, 'confirm').and.returnValue(true);
      let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

      component.delete(1);

      expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
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

