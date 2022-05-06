
// When we work with backend services => we dealing with Observable objects
// If we work with other Jscript library or frameworks => chances are we're going to work a lot with promises
// ¿Why Angular team have used observables instead of promises?

// Lets see what happen if we dotn subscribe to an observable => In deletePost method => just send http request without subscribe:
// ... this.service.delete(post.id);
// In network tap (detool) => we can see request sent to server => We have 1 request to get list of post => But not request to delete post
// So, with observables NOTHING happens until we subscribe to them => If we call delete method => Our service is not going to call the backend
// ... this.service.delete(post.id).subscribe();
// Again if we see the network tap => we have 1 request for deleting the post 

// Observables are lazy => Nothing happens until subscribe to them
// Promsies are eager => As soon as we create a promise => The code is executed

// Now to work with promises => in data.services.ts in delete method => instead return observable return a promise
// We can always conver observable to promise if we want to => but is something not recommend => UNLESS you have strong reason
// Like map operator => there's other operator to convert to promise => 'rxjs/add/operator/toPromise'
// after map operator => add .toPromise()

// Now in the component => we cant use .subscribe() => instead promise have two methods:
// then() => for getting the result 
// catch() => for handling errors
// But here we just remove subscribe: ...this.service.delete(post.id)
// And in network tap => we see the delete request 

// Observables are lazy => There'are a lot more operators => can allow to implement powerful features with far less code=> aritmethics, timer, etc
// Another operator is .retry(numberOfTimes) => If call to server fails => the observable will try e.x 3 times 
// In traditional way => you need for-loop, variable => But with observable just use the operator
// This far less code implementation is called =>  Reactive Programming 
// RXG(library) => allow us to write code in reactive style
// The most operator use as angular developer is .map and .catch

// These operators dont exist in promises => And only come effect when we subscribe to observable 
// When we call the map function nothing is been map => Only we are doing is promgramming this observable 
// We can change all these operators => later when we subscribe to these observables => All these operators comming different








// In data.service.ts

import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'           
@Injectable()
export class DataService{
                      
    constructor(private url:string, private http:Http){}
    getAll(){
        return this.http.get(this.url)
            .map(response => response.json())               //map operator 
            .catch(this.handleError);
    }

    create(resource){
        return this.http.post(this.url, JSON.stringify(resource))
        .map(response => response.json()) 
        .catch(this.handleError);
            // return Observable.throw(new AppError(error))
    
    }

    updatePost(resource){
        return this.http.patch(this.url +'/'+resource.id,JSON.stringify({ isRead:true}))
            .map(response => response.json())  
            .catch(this.handleError);
    }

    deletePost(id){
        return this.http.delete(this.url +'/'+ id)
        .map(response => response.json())  
        .catch(this.handleError)
    }

    private handleError(error:Response){

        if(error.status === 400)
            return Observable.throw(new BadInput(error.json()));
  
        if(error.status === 404)
            return Observable.throw(new NotFoundError());

        return Observable.throw(new AppError(error));
    }
}




// post.service.ts
import {Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class PostService extends DataService{
    // private url = 'https://jsonplaceholder.typicode.com/posts';
    constructor(http:Http){ 
        super('https://jsonplaceholder.typicode.com/posts',http);
     }
    

}


//In posts.component.ts

import { Component } from '@angular/core';
import { PostService } from './../post.service'


@Component({
selector: 'posts',
templateUrl: './posts.component.html',
styleUrls: ['./posts.component.css']
})
export class PostsComponent implement OnInit {
    
    posts: any[];

    constructor(private service: PostService){        
    }
    
    ngOnInit(){
        
        this.service.getAll()     
            .subscribe(posts  => this.posts = posts);
        
    }


    create(input:HTMLInputElement){

        let post = { title: input.value }; 
        this.posts.splice(0,0,post);                    //Add new post faster
        
        input.value = '';                   
        
        this.service.createPost(post)
            .subscribe(
                newPost => {
                    post['id'] = newPost.id;
                    // this.posts.splice(0,0,post);
                    // console.log(posts);
            },
            (error: AppError) =>{
                this.posts.splice(0,1);                     //Remove new post if something goes wrong
                                                    //Space for different purpose => UI update vs Error handle
                if(error instanceof BadInput)
                    this.form.setErrors(error.originalError); // Comment this line if not have a form
                else
                    throw error;                          
            });
    }

    update(post){

        this.service.updatePost(post).
            subscribe(updatedPost => console.log(updatedPost));
    
    }

    delete(post){
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);  

        this.service.deletePost(post.id).
        subcribe(
            null,
            (error:AppError) =>{
                this.posts.splice(index,0,post);   
                // if(error.status === 404)
                if(error instanceof NotFoundError)
                    alert('This post has already been deleted.');
                else 
                    throw error;                          
            });
    }

}


// In app-error.ts class

export class AppError{
    constructor(public originalError?: any) { //Decorate with public to access in our class

    }
}

// In not-found-error.ts class => Derivate from app-erro class

export  class NotFoundError extends AppError{

}


// In bad-request-error.ts class => Derivate from app-erro class

export  class BadInput extends AppError{

}

// In app-error-handler.ts
import { ErrorHandler } from '@angular/core'

export class AppErroHandler implements ErrorHandler{
    handleError(error){
        alert('An unexpected error occured');   
        console.log(error);  
    }
}