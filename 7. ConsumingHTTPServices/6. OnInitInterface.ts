

//In the constructor of our component => calling the method get of http object 
// As a best practice constructor should be very small and lightweigth 
// Components in angular has => Lifecycle hooks  => Special methods
// Lifecycle hooks => We can add them to our component and Angular will automatically called them at specific time during the life cycling of the component
// e.x Lifecycle Events => Angular creates a component, when renders it,when creates and renders its children, when destroys a component
// One of this Lifecycle hooks method is ng OnInit()
// OnInit interface => Declares a method called ngOnInit() => takes not parameters and return void
// This method Angular call when initialize our component 

// There're multiple Lifecycle hooks:
// OnInit
// OnChanges
// DoCheck
// AfterContentInit
// ...
// Each of these interfaces declare a method with same name prefix with 'ng'

// Tecnhically we dont have to add OnInit interface (implements) as long as we have a method ngOnInit in our class => Angular will call this when initialize component
// But we use implements keyword add compile time checking => tsc ensures we have method called OnInit




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
}

