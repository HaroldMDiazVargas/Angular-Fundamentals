// Delete functionality

//By convention HTTP Delete dont have a body(Not Body parameter)
// htt.post.delete(URL)


//In posts.component.html

<input type="text"
#title
(keyup.enter) = "createPost(title)"
class="form-control">

<ul class = "list-group">
    <li 
    *ngFor="let post of posts"              //All the posts retrieve from jsonplaceholder as our backend
    class= "list-group-item">
    <button class="btn btn-default btn-sm"
    (click)="deletePost(post)"
    >Delete</button>

    {{post.title }}
    </li>
</ul>


// In  posts.component.ts
import { Http } from '@angular/http';
import { Component } from '@angular/core';

@Component({
selector: 'posts',
templateUrl: './posts.component.html',
styleUrls: ['./posts.component.css']
})
export class PostsComponent {
    posts: any[];
    private url = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: Http){ 
        http.get(this.url).subscribe(response => {
                            //  console.log(response);               
                             this.posts = response.json();                    
        });
    }

    createPost(input:HTMLInputElement){


        let post = { title: input.value }; //In real app Multiple properties or JSON object behind the form
        input.value = '';                   // Clear input field
        this.http.post(this.url, JSON.stringify(post)).subscribe(response => {
            post['id'] = response.json().id;
            this.posts.splice(0,0,post);
            console.log(response.json());
        });
    }

    updatePost(post){

        this.http.patch(this.url +'/'+post.id,JSON.stringify({ isRead:true})).subscribe(response => {

            console.log(response.json());
        })
        // this.http.patch(this.url,JSON.stringify(post));
    }

    deletePost(post){

        this.http.delete(this.url +'/'+post.id).subcrobe(response =>{
                // Find the index of this post in the array to delete it
                let index = this.posts.indexOf(post);
                this.posts.splice(index,1);  // index and delete 1 object
                
        })
    }

}