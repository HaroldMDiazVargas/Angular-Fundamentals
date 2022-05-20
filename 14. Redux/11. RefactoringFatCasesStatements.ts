
//--In store.ts
// In this simple app => we only have 4 different action types
//                    => switch block is getting little fat
//                    => we can not see whats going on in 1 page
// Simple tecnhique to refactor this code and make more maintainable
// basically we are going to use => extract function refactory in each case block
//
// declare a function => function addTodo() => function takes 2 params => state and action
//                    => function addTodo(state,action)
//                    => then paste all the code for the => case ADD_TODO
//                    => so => note this function is an internal function of this module
//                          => we dont want to export it to the outside
//                    => finally in our rootReducer => in case ADD_TODO :
//                                                  => return addTodo(state,action)
// At the same way => declare for the other three actions
// An we will see that everyline we repeat the arguments => ..(state,action)
// So, potentially we could put all these functions in a class
//     => and pass the state and action => in the constructor of the class
//     => this way we dont have to repeat in everyline
//     => create a class TodoActions{ }
//          => in constructor(private state, private action)
//          =>  then we will have the functions with  any arguments
//    => in our rootReducer we create an instance of TodoActions class => before the switch statement
//    => and with the instance => we access to the methods => instance.method() => and not need args



// todo-list.component.ts
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux'; 
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO } from '../actions'; 
import { IAppState } from '../store'; 

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @select() todos; 
  
  constructor(
      private ngRedux: NgRedux<IAppState>
      private service: TodoService) {
  }

  ngOnInit(){
    //   this.service.getTodos().subscribe( todos =>{
    //       this.todos = todos.json();
    //   })
    
    this.service.loadTodos();
}



  addTodo(input) {
    if (!input.value) return; 

    var todo = { title: input.value };
    this.ngRedux.dispatch({ type: 'ADD_TODO', todo:todo, id:Date.now() });

    this.service.addTodo(todo).subscribe(t=>{
        this.ngRedux.dispatch({ type:'ADD_TODO_CORRELATED', todo:todo, id:...})
    })
    input.value = '';
  }

  toggleTodo(todo) {
    this.ngRedux.dispatch({ type: TOGGLE_TODO, id: todo.id });
  }

  removeTodo(todo) {
    this.ngRedux.dispatch({ type: REMOVE_TODO, id: todo.id });
  }

}




// todos.service.ts

@Injectable()
export class TodoService{
    private readonly url = "https://jsonplaceholder.typicode..." //endpoint

    constructor(
        private http: Http,
        private ngRedux: NgRedux<IAppState>){}

    // getTodos(){
    //     return this.http.get(this.url);
    // }

    loadTodos(){
        this.ngRedux.dispatch({ type:'FETCH_TODOS_REQUEST' })
        this.http.get(this.url).subscribe(
            this.ngRedux.dispatch({ type:'FETCH_TODOS_SUCCESS' , todos: todos.json()}) 
        , err => {
            this.ngRedux.dispatch({ type:'FETCH_TODOS_ERROR' })
        })
    }

    addTodo(todo){
        return this.http.post(this.url, todo);
    }

}



//--store.ts

import { tassign } from 'tassign'; 
import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, CLEAR_TODOS } from './actions'; 

export interface IAppState {
  todos: any[];
  lastUpdate: Date; 
}

export const INITIAL_STATE: IAppState = { 
  todos: [],
  lastUpdate: null
}

function addTodo(state,action){
    var newTodo = { id: state.todos.length + 1, title: action.title };

    return tassign(state, {
      // Instead of the push() method, we use the concat() method because the former mutates
      // the original array, whereas the latter returns a new array. 
      todos: state.todos.concat(newTodo),
      lastUpdate: new Date()
    });
}


function toggleTodo(state,action){
    // When modifying an item in an array, we should create a new array, and copy 
      // all other item from the source array (except the item to be modified). At the same time
      // we should create a copy of the item to be modified and apply the mutations using tassing.

      // So, first we need to find the item to be modified. Here, we are finding it by it's id. 
      var todo = state.todos.find(t => t.id === action.id);

      // Now, we need to find the position of this item in the array. 
      var index = state.todos.indexOf(todo);

      return tassign(state, {
        todos: [
          // Using the slice() method, we can slice an array. This method does not mutate the 
          // original array, and returns a new array. So here, we're getting all the items from 
          // the beginning to the index of the item we're going to modiy. 
          // 
          // We use the spread operator (...) to enumerate an array. This is a clean way to 
          // concat two arrays. Instead of 
          // 
          // var newArray = [];
          // newArray.concat(sourceArray1).concat(sourceArray2);
          // 
          // We can write: 
          // 
          // var newArray = [...sourceArray1, ...sourceArray2];
          ...state.todos.slice(0, index),

          // So, we have copied all the items before the item to be modified. Now, we take a copy
          // of this item and apply the mutation (isCompleted).
          tassign(todo, { isCompleted: !todo.isCompleted }),

          // Now, we need to copy all the items after this item. Again, we use the slice() method
          // to get all the items following that item, and use the spread operator to enumerate 
          // them and put them in our target array. 
          ...state.todos.slice(index + 1),
        ],
        lastUpdate: new Date()
      });
}



function removeTodo(state,action){
    return tassign(state, {
        todos: state.todos.filter(t => t.id !== action.id),
        lastUpdate: new Date()
      });

}

function clearTodos(state,action){
    return tassign(state, {
        todos: [],
        lastUpdate: new Date()
      });
}

export function rootReducer(state: IAppState, action): IAppState {
  switch (action.type) {
    case ADD_TODO:  return addTodo(state,action);
    case TOGGLE_TODO: return toggleTodo(state,action);
    case REMOVE_TODO: return removeTodo(state,action);
    case CLEAR_TODOS: return clearTodos(state,action);
   
  }

  return state; 
}