// How to get data of fake Server and display in our app => Consume HTTP Services


// 1. Go to app.module.ts import module => imports[] => HttpModule => Encapsulate all classes for working with HTTP Services
// 1.1. To make work Depency Injection of Http => in app.module.ts => Register this dependency in providers:[Http]
//       But it's not neccesary => All Depency Injection set up propertly with just the first Step.
// 2. In constructor of component pass type anotation => Http class => Used for get/save the data to send HTTP Request to backend


// http.get(URL)  => Send http get request to server => Return an Observable of Response => Observable<Response>
// Here we go to Network => to Server => Data is not available inmediatly => Delay(ms,s) 
// We dont want main thread that is executing this code get blocked => Promise and Observable => The result is ready will notify
// Observable => has a method called subscribe => Subscribing to this observable => When result is ready will be notify
// subscribe() has three overloads(use up/down arrows) => There're 3 ways we can use this subscribe() method
// Each overload has different parameters => Here we use the 3rd overload => Two parameters
// subscribe(next?:(value:Response) => void, error?:any)

// Response object in console => status:200 (OK) => headers
// Most of time we dont use Response Object in raw form => Convert o JSON Object => Use these JSON object to display data
// Better use response.json() => Convert response to JSON object => Here we obtain array of posts


// In our app we have other backend instead of jsonplaceholder => We can build that backend or any other deveper



//In posts.component.html

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

    constructor(http: Http){ //Depency injection 
        http.get('https://jsonplaceholder.typicode.com/posts').subscribe(response => {
                                                     // This arrow function is called a subscription function
                                                    //Access to this response
                            //  console.log(response);    
                             this.posts = response.json();                    
        });
    }

}
