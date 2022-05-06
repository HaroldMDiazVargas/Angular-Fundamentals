
// Our post.service.ts is good =>small methods, with factory common code =>  But in a real world we dont have only 1 Service
//We have multiple service => Imagine create a Service with the courses endpoint => createCourse, updateCourse, getCourses and deleteCourse
// In that new Service our code is going to look almost identical => Our methods will be similar and repeat implementation and handleError
// So extract a ReUsable Serivice => Working with HTTP EndPoints

// In services/ add new file data.service.ts => Paste all content that is inside post.service.ts
// The URL  => delete initialization
// getPost => better getAll
// createPost(post) => just create(resource)
// updatePost(post) => update(resource)
// deletePost(id) => delete(id)

// Of this way there is nothing specific about Post => Now delete all methods inside post.service.ts
// The class PostService => inheritance all the code defined in the generic DataService => extends PostService
// In base class constructor => define new parameter=> private url:string => All classes derivates from DataService => Supply the URL 
// In derivate class constructor => Delete private keyword of http field define in constructor in derivate class => it's define in constructor of base class
// In derivate class constructor =>  Mst contain the SUPER CALL => the constructor of base class needs URL parameter and Http Object
// So when creating a PostService object(derivate) => First need to create a DataService object(base) 
// In derivate class constructor =>  Use super(URL,HttpObject) => Finally our PostService has only 3 lines of code
// Finally make changes about method call in post.component and remove imports of PortService dont use.









// In data.service.ts

import {Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'; 
import 'rxjs/add/observable/throw'           
@Injectable()
export class DataService{
                      //Not specific URL, initialize
    constructor(private url:string, private http:Http){}
    getAll(){
        return this.http.get(this.url)
            .catch(this.handleError);
    }

    create(source){
        return this.http.post(this.url, JSON.stringify(source))
        .catch(this.handleError);
            // return Observable.throw(new AppError(error))
    
    }

    updatePost(source){
        return this.http.patch(this.url +'/'+source.id,JSON.stringify({ isRead:true}))
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
            .subscribe(
                response => {
                        //  console.log(response);               
                    this.posts = response.json();                    
            });
        
    }


    create(input:HTMLInputElement){

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

    update(post){

        this.service.updatePost(post).
            subscribe(response => {
                console.log(response.json());
        });
        
    }

    delete(post){

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