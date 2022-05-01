// To create a new post => Write+enter in an input field
// Send HTTP Post Request to jsonplaceholder to create new post in server(behind)

// Make createPost function => Use http.post method => send HTTP Post Request to the server

// Few different type of of HTTP Request => Each one has Verb(Determinate type of action)
// HTTP GET => Get data
// HTTP POST => Create data
// HTTP PUT => Update data
// HTTP DELETE => Delete data
// HTTP PATCH


// In http.post(URL, BodyOfTheRequest)
// For creating data => BodyOfTheRequest should be a JSON object(converted to string) send to the server 
// To convertto string JSON object => JSON.stringify(JSONobject) method

// The http.post() method also return an Observable of the Response => Subscribe to this observable => Get the Response in our subscription function

// Object that we get from the server has only 1 property => id => Id of the new post
// In a real app when we send a HTTP Post to the server => The serve should respond with the complete representation of the newly created object
//   Instead of 1 id property => It shoudl have all the properties of the post Obejct
// But here we are working with a fake server
// Get the id from the server => Add it to the post object 
// Like id is not a property of post Object, there are two solutions:
// 1rstOpt => let post = { title: input.value };
// 2ndOpt => post['id'] = response.json().id;

// Add post to end of the list => use .push(post)
// Add at the begining => .splice(startPos, numberOfObjecToDelete, objectToAdd) = >(0,0,post)



//In posts.component.html

<input type="text"
#title
(keyup.enter) = "createPost(title)"
class="form-control">

<ul class = "list-group">
    <li 
    *ngFor="let post of posts"              //All the posts retrieve from jsonplaceholder as our backend
    class= "list-group-item">
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

}
