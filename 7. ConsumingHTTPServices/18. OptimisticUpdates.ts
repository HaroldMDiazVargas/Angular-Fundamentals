
//Optimistic & Pessimistic Updates
//Optimistic => Hopeful; Pessimistic => Hopeless

//Ther's a delay when I create a new Post in input field => Press enter + delay => Appear the new post => Because we expect a succesful response from server
// This is what we call => Pessimistic update => Assuming the call to the server will probably fail => Only add item to list if we get a succes...
// In contrast => Optimistic update => Instead of waiting the response from server => Update the UI inmediatly => Assume the most of time call to server is succed
// If that fails for any reason => we can go back our changes 

//A lot modern app use optimistic update => makes app appear faster and smother

//In post.component.ts
// in createPost method=> we're updating post array upon reciving a succesful response from server 
// Move splice as soon as create post object => inmediatly update post array => THEN call the server
// Now if something goes wrong => reback changes => remove post from top of array => in error function => Add splice for delete new post
// Remember to make code more readble => let spaces bewteen different purpose lines of code

// Now change implementation of deletePost and use Optimistic update
// Move the index-splice up to metdho before meka de delete request 
// In call the server => we dont care the succesful message we get from server => instead of passing empty arrow funtcion => pass null
// However if something goes wrog => in en error function => reback changes => put post where is used to be => use splice method


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
                this.posts.splice(index,0,post);   //reback make the changes
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