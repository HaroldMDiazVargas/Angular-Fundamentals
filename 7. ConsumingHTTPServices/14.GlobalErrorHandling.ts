// We have repeated these two lines in different places in our post.component.ts:

// alert('An unexpected error occured');    
// console.log(error);   

// These two lines are essentially for handling unexpected errors => We dont want to repeat in all our components
// So is better handling these unexpected errors Globally
// app/common/ => Add new file app-error-handler.ts => Export Class responsible por handling all unexpected exceptions in our app
// Search Error Handler in angular.io => Is one of Built-in classes in Angular 
// In the implementation of that class => Method called handleError(error:any):void => Takes error Object of type any and returns void
// In the default implementation of this class in Angular => Angular simply logs this error message on the console
// But we want to provide an implementation to display error message to user and also potentially log this error on the server

//Example in angular.io => class MyErrorHandler implements ErrorHandler {} => Write the same code in our app
//so in our class(app-error-handler.ts) => implements ErrorHandler and write the handleError method to avoid appear any error

// Back in our post.component.ts
// Take the two lines mentioned => Put in global error handling => Put in handleError method
// In the future instead of the alert => display in a Toast notification
// And instead of console.log => Log error message on the server 

// We need to register global Error handler as dependencies or provider in => app.module.ts(Inside provider[]) 
// Instead of register as AppErrorHandler => Better tell Angular where are internally you are using ErrorHandler instead use AppErrorHandler
//  Internally in Angular framework are multiple places where an ErrorHandler class is used (default implementation by angular)
// So tell to Angular replace the default implementation for the new implementation:
// Pass an object provider[..., {object}] => Should have two properties:
// 1. provide: => which is the name of the class we're going to replace  => In this case ErrorHandler
// 2. useClass: => Add the replacement => In this case AppErrorHandler 
// With this object => Wherever Angular is using ErrorHandler instead use AppErrorHandler class

// Now in ngOnInit => Remove error handler function =>  Better error to propagate in our app and eventually it will hit the Global Error Handler
// Now in createPost => We want still the error handler function => Because we want to check if error is and instanceof BadInput => BUT change else block
// ................. => in else instead the alert and log error in console => re throw the error => else throw error => Can be handle by Global Error Handler
//...................=> If not rethrow error => the error will actually handling in that code block => Will never hit our Global Error Handler
// Now in updatePost => Remove the error handler function(we dont have special case, just dealing with unexpected errors)
// Now in deletePost => Similar to createPost => rethrow the error 

//Now simulate deletePost(457) => Simulate expected error(404)
// Now simulate unexpected error => change url to invalid 





// post.service.ts
import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'           
@Injectable()
export class PostService{
    private url = 'https://jsonplaceholder.typicode.com/posts';
    constructor(private http:Http){}
    getPosts(){
        return this.http.get(this.url);     //return observable
    }

    createPost(post){
        return this.http.post(this.url, JSON.stringify(post))
        .catch((error:Response) => {        // Error function => takes and error of type Response (goes to) code block
            if(error.status === 400)
                return Observable.throw(new BadInput(error.json()));
            return Observable.throw(new AppError(error.json()))
        });
    }

    updatePost(post){
        return this.http.patch(this.url +'/'+post.id,JSON.stringify({ isRead:true}));
    }

    deletePost(id){
        return this.http.delete(this.url +'/'+ id)
        .catch((error:Response) =>{
            if(error.status === 404)
                return Observable.throw(new NotFoundError());
            return Observable.throw(new AppError(error));

        });
        
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
        
        this.service.getPosts()     
            .subscribe(
                response => {
                        //  console.log(response);               
                    this.posts = response.json();                    
            });
        
    }


    createPost(input:HTMLInputElement){

        let post = { title: input.value }; 
        input.value = '';                   
        this.service.createPost(post)
            .subscribe(response => {
                post['id'] = response.json().id;
                this.posts.splice(0,0,post);
                console.log(response.json());
            },
            (error: AppError) =>{
                if(error instanceof BadInput)
                    this.form.setErrors(error.originalError); // Comment this line if not have a form
                else
                    throw error;                          
            });
    }

    updatePost(post){

        this.service.updatePost(post).
            subscribe(response => {
                console.log(response.json());
        });
        
    }

    deletePost(post){

        this.service.deletePost(post.id).
        subcribe(
            response =>{       
                let index = this.posts.indexOf(post);
                this.posts.splice(index,1);  
            },
             (error:AppError) =>{
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