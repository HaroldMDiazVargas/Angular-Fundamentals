// Implement abitility of update data

// Add button with (click) event binding to updatePost(actualPostObject)

// We need to use http object to send HTTP Request to updte data, 2 choices:
// 1rstOpt => this.http.put => Update all properties of an object => Send to server all properties
// 2ndOpt => this.http.patch => Update only a few properties of an object => Send to server only properties that should be modifier(easier in code)

// this.http.put(URL, BodyOfTheRequest(entire object))
// this.http.patch(URL,BodyOfTheRequest(PropertiesShouldBeModify)) => Slight performance benefit

// You need to check if the API support botch => put and patch methods 
// Usually most people build API respond to put request => patch is not supported

// 404 Error => Need to reference a specific post when using patch or put method => URL must be a specific post => post.id

// In network tap(DevTool) => Request details => URL, Method(patch), status ... scroll down ...=> Request Payload => Object sending to the server


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
    (click)="updatePost(post)"
    >Update</button>

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

}