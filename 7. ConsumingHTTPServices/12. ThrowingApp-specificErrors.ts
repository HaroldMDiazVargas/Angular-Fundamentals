// In deletePost() we have a problem: Violation of sepration of concerns
// Early we created Service => encapsulate all the details about consuming HTTP Services on our background

// But in the next lines: We are working with the response object come form server
// This language is not about the component => is about the service=> Move logic inside Servic
// Instead of working with the Response object => we need to work that is part of our app domain => Not specifix of our HTTP Protocol


// (error:Response) =>{
//     if(error.status === 404)



// In deletePost() of post.service.ts:
// If we we have an error(exception) => catch that error => Send different kind of object to our component instead of the Response
// http.delete() => Returns an Observable => Type prt of a 3rd party library called ReactiveExceptions
// Observable type has a bunch  of methods => called operators => are not by default(only forEach, lift and subscribe)
// Want method we need is => .catch =>We need specific import on the top => Is used to catch the error 
// 'rxjs/add/operator/catch' => 'rxjs' is the library where is the operator
// .catch(sendDifferentKindOfErrorObject) => to consumer which is our component get the error => Do something with it
// .catch() => return an Observable that has a method, not return void.
// To return an observable that has an error:
// 1. Import the observable type on top => from 'rxjs/Observable'
// 2. Now we have a method Observable.throw() =>Return a new Observable that has an error
// The type of that error should be something specific to our app => Not the response Object

// Create a new class in app/common/app-error.ts to represent application specific errors
// In the class => Export class AppError => Represent an app error
// So, as arguument to Observable.throw(AppErroObject)
// Is good practica to include original error inside AppError instance => Somewhere we get that error and log on server
// So, pass original error => Finally rreturn the results

// In summary =>
// Catching the error object which is an instance of the Response class => Then return a different kind of error specific to our app
// We need to change the implementation => Check for status of error (if 400 or 404) => return a different kind of error
// Because in our component we need to know if that post exist or not => We dont to check the status of the Response Object

// In common/ folder => add new faile not-found-error.ts
// In the class => Export class NotFoundError  => Derivate from AppError class => kind of app error but more specific
// Now => check the status of server => 404 => return Observable.throw(NotFounError Instance)
// In this case not put the original error => We're not going to log this to the server => This is legitime error(not an unexpected error) 

// Las stept => In our component
// Instead of working with the (error:Response) object => work with AppError or one of its derivities
// Because in post.service => throwing either AppError or NotFoundError
// (Observable.throw(new NotFoundError() or new AppError(error)) => Essentially we're catching a Response Object and throwing and AppErrorObject 
// So, in our component type of the error => Response should be AppError => And check if error is an instance of NotFoundError
// In jscript => we have an operator called 'instanceof'

// ---------------------For create method---------------------------------------
// Now the same for thhe createMethod => Instead of working with the Response object and chek status is 400 => Better work with App Specific Errors
// Create in/common/ bad-input.ts => Input to differentiate from http protocol(which use request word)
// Create class BadInput extends AppError 
// The argment for newBadInput(error.json) => Include error object came from the server => error object includes data about the invalid fields
// Otherwise pass generic AppError object with argument => original error object => For logging later

// We have improved the separation of concern in our code => In post.component.ts=> Not longer work with the Response Object or HTTP 


// post.service.ts
import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'; //Catch operator of Observable

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
                return Observable.throw(new NotFoundError());Observable.throw(new AppError(error))
            return Observable.throw(new AppError(error));

        });
        // return this.http.delete(this.url +'/'+ id);
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
            },
                error =>{
                    alert('An unexpected error occured');    //Display alert to the user
                    console.log(error);                  //Just for demostration
                            
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
                    alert('An unexpected error occured');   
                    console.log(error);                            
            });
    }

    updatePost(post){

        this.service.updatePost(post).
            subscribe(response => {
                console.log(response.json());
        },
            error =>{
                alert('An unexpected error occured');   
                console.log(error);                            
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
                    alert('An unexpected error occured');   
                    console.log(error);                            
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