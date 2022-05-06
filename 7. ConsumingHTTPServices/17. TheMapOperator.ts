
// We still have 1 tiny issue in post.component.ts => When we subscribe to the observable => we're working with the Response Object
// But we dont want to work with this Object in our component => Instead of working with Response object an calling json method => I want get an array of objects
// So in data.service.ts => In getAll method use one of the observable operator => map method => we can transform the items in an observable
// import map operator in data.service.ts 'rxjs/add/operator/map' 
// in getAll => call map method(response => response.json()) => we're transforming the Response object to an array of Javascript objects

// Now in ngOnInit of post.component.ts:
// Instead of getting a Response => we get an array of object => rename response with posts 
// Not need to call json method 
// The body of the arrow function => 1 line of code => remove braces  and semicolon => put all in one line


// Make the same for all other methods => create, update and delete 
// Make sure to write a semantic word for the return object in subscribe method: 
// createPost => use newPost( which is returned from the server )
// updatePost => use updatedPost( returned from the server ) 
// deletePost => Not return anything from server, so use just () in arrow function





// In data.service.ts

import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'           
@Injectable()
export class DataService{
                      //Not specific URL, initialize
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
        input.value = '';                   
        this.service.createPost(post)
            .subscribe(
                newPost => {
                    post['id'] = newPost.id;
                    this.posts.splice(0,0,post);
                    // console.log(posts);
            },
            (error: AppError) =>{
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

        this.service.deletePost(post.id).
        subcribe(
            () =>{                   //we dont get anything in Response when we delete object in jsonplaceholder => use()
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