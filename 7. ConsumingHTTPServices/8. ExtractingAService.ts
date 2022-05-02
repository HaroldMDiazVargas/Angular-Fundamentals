

// Create and register in providers[] the new src/app/post.service.ts
// It's better to create folder src/app/services => Put all the services here => Change path of import in app.module.ts


// In post.service.ts

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



// In  posts.component.ts
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
        
        this.service.getPosts()     //Separation of concerns
        .subscribe(response => {
                    //  console.log(response);               
                        this.posts = response.json();                    
        });
        
    }


    createPost(input:HTMLInputElement){

        let post = { title: input.value }; //In real app Multiple properties or JSON object behind the form
        input.value = '';                   // Clear input field
        this.service.createPost(post)
        .subscribe(response => {
            post['id'] = response.json().id;
            this.posts.splice(0,0,post);
            console.log(response.json());
        });
    }

    updatePost(post){

        this.service.updatePost(post).subscribe(response => {

            console.log(response.json());
        })
        // this.http.patch(this.url,JSON.stringify(post));
    }

    deletePost(post){

        this.service.deletePost(post.id).subcribe(response =>{
                // Find the index of this post in the array to delete it
                let index = this.posts.indexOf(post);
                this.posts.splice(index,1);  // index and delete 1 object
                
        })
    }



}


