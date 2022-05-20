// Calling Backed APIs

// All the examples we have not talked about the Server
// Action Creators => For persistent the state on the Server
//                 => Is antipattern (should stay away from that)=> better a use a simple way
// => Simple way to bring Server into this picture
// => 

// In a typical angular app
// ex => we have a todo.service.ts => injected to our todo-list.component.ts in the constrcutor
//                                 => in the service.ts => we have a end point(url)
//                                                      => we injected Http service in the constructor
//                                                      => simple methods 
//   => in our todo-list.component.ts => we implemented the OnInit interface 
//                                    => to getTodos() list from the server and render on the page(typically)
//                                    => so in ngOnInit() method => we use the service to ge tthe items
//                                                               => subscribe to result => and set state to the component 
//                                                                                      => this.todos = todos.json();
//   => So all this => our No-Redux way
//                  => our component is mainting its internal state
//  => However, when using Redux => we dont store the state in our component like this(this.todos = todos.json();)
//                               => instead we dispatch an action
//                               => then that action goes to the reducer
//                               => and eventually the state of the store gets updated under the hood
//
//-- In todo-list.component.ts
// in ngOinit()
// instead of this.todos = todos.json() => dispatch an action
//                                      => this.ngRedux.dispatch({ type:'FETCH_TODOS_SUCCESS' }) 
//                                      => in the body of this action => we will have all the todos from the server
//                                          =>this.ngRedux.dispatch({ type:'FETCH_TODOS_SUCCESS' , todos: todos.json()}) 
// optionally we can dispatch another action => before sending a request to the server
//                                           => we can use that to render a loading icon on the view
//                                           => this.ngRedux.dispatch({ type:'FETCH_TODOS_REQUEST' })
//              then we can modify our reducer => when we get an action like this
//                                             => we can set a property on the store like => store.isFetching = true
//                                             => and then we can use this property to render a loading icon on the view
//
// then we can have another action as well => in the subcribe method as second parameter
//                                         => is for handling errors if the request to the server fails
//                                         => we can get an error object => then depatch another action
//                       ...subscribe(.., err => {this.ngRedux.dispatch({ type:'FETCH_TODOS_ERROR' }) }) 
// 
// All this is a valid implementation => if we are getting the list of todos only in 1 component
//                                    => But if ther're multiple components in our app where we get list of todos
//                                    => we need to repeat all this logic in different places
//                                          => we mean => dispatchin these 3 actions=> success, request and error
//                                   => so is better to encapsulate all this logic in a Service

//-- In todo.service.ts
// In the constructor => we can inject NgRedux just like we did in our component
// In the getTodos() => before sending the request to the server
//                   => we can dispatch an action => this.ngRedux.dispatch({ type:'FETCH_TODOS_REQUEST' })
//                   => and instead of return the Observable to client
//                      => subscribe to it => dispatch action if successful
//                                              => this.ngRedux.dispatch({ type:'FETCH_TODOS_SUCCESS' , todos: todos.json()}) 
//                                         => and also handle error
//                                              =>  ...subscribe(.., err => {this.ngRedux.dispatch({ type:'FETCH_TODOS_ERROR' }) })
//  Basically we take all the logic from the component => and encapsulate it in the Service
//  So we can change the name of the method getTodos() => for => loadTodos()
//                                                            => because we are not expecting return anything from this method

//-- In todo-list.component.ts
// instead of adding all logic in ngOnInit()
// we simple call => this.service.loadTodos()
//                => this is how we get the data from the server

//--POSTING DATA TO SERVER--
// with non-redux implementation
// In the default way => 1. create object an set input value(form)
//                    => 2. update  todos array
//                    => 3. call the server
//                    => we are using optimistic update
//                    => We are updating the client state => assume persistence of this object on the server is going to success most of time
//                    => if not we rever the changes of the client
// So with redux
// instead of modifing the client state => directly => this.todos.push(todo) (adding to the array of todos the new todo item)                   
//                                      => we dispatch an action => this.ngRedux.dispatch({type:'ADD_TODO',todo:todo})
//  Here we have a tricky scenario => we're genering the id of the new todo item on the client

//-- In store.ts
// If we see our reducer function => we're getting the count of items in our array
//                                => and adding 1 to it  to set the id
// But when we call our backend => to persist the todo item 
//                              => this id is most often generated on the Server in the database
//      

//-- In todo-list.component
// There're 2 ways to bring the id to the client:
// 1. Pessimistic update instead of optimistic update  => simple way
//                                                     => instead of updating the client state first => (dispathch action 'ADD_TODO')
//                                                     => call the server and subscribe to observable
//                                                        => at this point we have a todo item object that has an id generated on the server
//                                                        => so, inside subscribe method => distpatch the action 'ADD_TODO'
//                                                                                       => this action includes the todo item title and its id as well
// But what if we want to use optimistic update => to update the client first
//                                              => we need to generate a unique identifier on the client
//                                              => then when we get the response from the server
//                                              => we need to correlate that server id with the client id 
// So => before calling the server we dispatch the action => so client state is updated
//                                                        => and we generate an id in the dispatch => id:'GUID'     
//                                                                                                 => or in some cases we could use id: Date.now()
//                                                       => this.ngRedux.dispatch({ type:'ADD_TODO', todo:todo, id: Date.now() })    
//   => then when we get the response from the server => we need to dispatch another action
//                                                     => ..subscribe( t={ this.ngRedux.dispatch({ type:'ADD_TODO_CORRELATE', todo:t, id: ...}) })  
//                                                     => in this action we can include the id generated by the client and the id return from server as well
//                                                     => and then in our reducer => we can find the object in the array
//                                                                                => and modify its id
// Note
// We use Redux to maintain the client state
// conceptually we should not worry about the server state
// the concept of Action Creator as a solution to talk to the server is an anti pattern
// and brings extra complexity to our implementation                             


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