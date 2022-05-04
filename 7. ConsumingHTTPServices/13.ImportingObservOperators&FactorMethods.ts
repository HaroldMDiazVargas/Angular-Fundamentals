
// If we test app to delete post => We get alert 'An unexpected error ocurred' => But in console if a 404 error
// In console see => Observable.throw is not a function => throw is an operator method(static) of Observable => Like is suscription and catch(instance)
// We have to import that operator on top 'rxjs/add/observable/throw'  
// In Observable type(class) we have a bunch of static methods(like throw) => Factory methods =>we use to create new instance of an Observable object 





// post.service.ts
import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'; //Catch operator of Observable => Instance method available on Observabe object => operator
import 'rxjs/add/observable/throw'           //Throw method is a static method => Accessible by Observable Class => Factory method

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