// Remember format code level according methods, parameters,. => easy-reasy

// For 404 Error:
// In deletPost() => possible that post with givn id doesnt exist in server => 404 Error
// We need to chek the status of the response in our error handler
// error. => There's not intellisense => Type of error is any => anotate with Response class in parenthesis(arrow funciton condition)
// error. (access to all members) => if is 404 => Tell user an alert => otherwise => display generic error message
// Simulate passing an invalid id in this.service.deletePost(354) => id only arrives to 100

// For 400 Error:
// Now in the createPost() => Imagine responde with a 400 message in case of bad data
// In the error handder function => check the status of response  => if error is 400 
// inestad on displayin an alert => imagine a complex form => display error message next to input fields
// use this.form.setErrors(errorObjectComeFromTheServer) => setErrors(error.json())
// this erro object comes from the server => has a bunch of key(fieldsInOurForm):value(error for those fields) pairs
// Otherwise => display generic error message




// postservice.service.ts
import {Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class PostService{
    private url = 'https://jsonplaceholder.typicode.com/posts';
    constructor(private http:Http){}
    getPosts(){
        return this.http.get(this.url);     //return observable
    }

    createPost(post){
        return this.http.post(this.url, JSON.stringify(post));
    }

    updatePost(post){
        return this.http.patch(this.url +'/'+post.id,JSON.stringify({ isRead:true}));
    }

    deletePost(id){
        return this.http.delete(this.url +'/'+ id);
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
            (error:Response) =>{
                if(error.status === 400)
                    this.form.setErrors(error.json());
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
             (error:Response) =>{
                if(error.status === 404)
                    alert('This post has already been deleted.');
                else 
                    alert('An unexpected error occured');   
                    console.log(error);                            
            });
    }

}
