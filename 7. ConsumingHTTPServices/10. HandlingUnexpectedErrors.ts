
// In ngOnInit => The subscribe method => Have to pass a function for working with response
// But this subscribe method has another optional parameter => error?(error:any) => void
// We need to pass a function that takes Error Object and returns void
// In a real world app is better to use Toast Notification instead of native alert function in Jscript
// The Toast Notifications are less confronting and more user-friendly

// Instead of using console.log => to display error in console => in real app store in a database on the server



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
        .subscribe(response => {
                    //  console.log(response);               
                        this.posts = response.json();                    
        },errors =>{
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
        },errors =>{
            alert('An unexpected error occured');   
            console.log(error);                            
        });
    }

    updatePost(post){

        this.service.updatePost(post).subscribe(response => {

            console.log(response.json());
        },errors =>{
            alert('An unexpected error occured');   
            console.log(error);                            
        })
        
    }

    deletePost(post){

        this.service.deletePost(post.id).subcribe(response =>{
               
                let index = this.posts.indexOf(post);
                this.posts.splice(index,1);  
                
        },errors =>{
            alert('An unexpected error occured');   
            console.log(error);                            
        })
    }

}
