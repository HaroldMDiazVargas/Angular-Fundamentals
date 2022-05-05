
// Now in our post.service => We see similar code in createPost and deletePost => When handling the error => Only difference is status code
// And in updatePost => we're not handling error because we assume this API endpoint not return any predifine any error message
// But in real world app => This API endpoint will return certain kinds of errors => Then we're going to have similar code repeated in this updatePost method as well

// Extract separate private method called => handleError => Instead of repeat in every method => Simply delegate the error handling to that new method
// create a private handlerError(error:Response)
// Now in catch method => Pass the reference of this new private method (NOT CALLING() only pass reference)
// Andthis way have error handler in all methods of the class PostService



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
        return this.http.get(this.url)
            .catch(this.handleError);
    }

    createPost(post){
        return this.http.post(this.url, JSON.stringify(post))
        .catch(this.handleError);
            // return Observable.throw(new AppError(error))
    
    }

    updatePost(post){
        return this.http.patch(this.url +'/'+post.id,JSON.stringify({ isRead:true}))
            .catch(this.handleError);
    }

    deletePost(id){
        return this.http.delete(this.url +'/'+ id)
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