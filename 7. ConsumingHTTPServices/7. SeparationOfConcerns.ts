
// This implementation violates separation of concerns principle =>  Our classes should be responsibly for a SINGLE RESPONSABILITY
// If class violates separation of concerns principle => Hard to mantain and hard to test
// Our post componet is involves in two different concerns:
// 1rst. Presentation logic behind this view => ex ¿should happen when click to remove btn => item remove from list 
// 2nd. Getting the data => it needs to know about the endpoint(URL), work with Http class, construct URL for update/delete methods
// In a larger and most complex app is likely we're goint to work with posts at diferent pages => Need the endpoint 
// If future URL changes for any reason => Update MULTIPLE places 
// Also from testing point of view => Implementation is little harder to test => Never ever call HTTP Services in our automated test
// We want to run hundres or thousands of automated test in few seconds(HTTP Request slow down)

// SOLUTION
// Create new class called => Service => Class pure responsibility for working with our backend
// ... All details working with the backend is encapsulated in one place => ReUsable in multiple places 
// Also in future these details change(e.x URL) => We have to update only 1 place in our code(1rst Benefit)
// 2ndBenefit => When we want to unit test our component => We can create fake implementation of this Service => Doesnt make HTTP Request
//..... Can make thousand of unit test in a few seconds



// In  posts.component.ts
import { Http } from '@angular/http';
import { Component } from '@angular/core';

@Component({
selector: 'posts',
templateUrl: './posts.component.html',
styleUrls: ['./posts.component.css']
})
export class PostsComponent implement OnInit {
    
    posts: any[];
    private url = 'https://jsonplaceholder.typicode.com/posts';

    constructor(private http: Http){ 
    }
    
    ngOnInit(){
        this.http.get(this.url).subscribe(response => {
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

