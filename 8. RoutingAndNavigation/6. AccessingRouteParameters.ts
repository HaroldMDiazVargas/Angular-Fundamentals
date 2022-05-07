
// In app module => we have this route parameter => {path:'followers/:username, component:GitHubProfileComponent} => 'username' => change to ID
// => {path:'followers/:id, component:GitHubProfileComponent} 
// How to extract this parameter in the GitHubProfileComponent => In real app => we want to get this parameter => use a service to get the profile of the given user

// In github-profile.component.ts 
// In order to get access to route parameters =>  We need to inject the ActivatedRoute class in the constructor
// This ActivatedRout is a Service defined in router library and is part of router Module
// In ngOnInit() => we can get the route parameters from this object => using .paramMap property => Gives us all the parameters in this route
// the type of .paramMap => is Observable<ParamMap> => So we can use subscribe operator to subscribe to this observable
// .paramMap.subscribe(next?:(value:ParamMap) => void, error?:(error:any) => void) => We have to pass a function takes a parameter of type ParamMap and return void
//  If we log(params) => We have Object of type ParamsAsMap => with two properties:
// keys => 0:"id" => We only have 1 key is id  => Becase in app.module we set 'id' as name of parameter
// params =>  id:"10586972" => key/value pairs for route parameter

// Now in ngOnUInit() => params. => see the members of this object => get, getAll, has and keys:
// get method => get the value of a given route parameter in string  => e.x get('id') => If we want a number use prefix + (jscript tecnhique)
// getAll method => get the value of all route parameters
// has method => to see if we have a parameter by given name in this object
// keys field => return all the keys for all the route parameters

// In a real world app once let id = +params.get('id') => we send this to server to get the profile of this user:
// e.x service.getProfile(id)





//-----------------------------------------------------app.component.html----------------------------------------------------------------------
// <navbar></navbar>
// <route-outlet></route-outlet>        //Directive


//-------------------------------------------------------navbar component--------------------------------------------------------------------

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

// navbar.component.html

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li routerLinkActive="active current" ><a routerLink="/followers">Followers</a></li>        
        <li routerLinkActive="active current" ><a routerLink="/posts">Posts</a></li>
      </ul>
    </div>
  </div>
</nav>

//--------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------Home component---------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubProfile component-------------------------------------------------------------

//github-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/route'     //Service 
@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
      this.route.paramMap
        .subscribe(params => {
            let id = +params.get('username');
            console.log(id);
            // service.getProfile(id);      to send to server and show the profile in real app

        });
  }

}



//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubFollowers component-------------------------------------------------------------

//github-followers.html

// <div *ngFor="let follower of followers" class="media">
//   <div class="media-left">
//     <a href="#">
//       <img class="avatar media-object" src="{{ follower.avatar_url }}" alt="...">
//     </a>
//   </div>
//   <div class="media-body">
//     <h4 class="media-heading">
//       <a [routerLink]="['/followers', followers.login]">{{ follower.login }}</a>             ///routerLink for raw parameters
//     </h4>
//     <a href="follower.html_url">{{ follower.html_url }}</a>
//   </div>
// </div>


//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
