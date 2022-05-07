// There're times we want to include optional parameters in our route 
// e.x on followers page we have 2 parameters  passed as query strings => localhost:4200/followers?page=1&order=newest 
// page and order are optional parameter => they're not required from this page to load

// In navbar.component.html
// <a routerLink="/followers">Followers</a> => render the link to followers page 
// This routerLink directive exports a property that we can use in a property binding expression => [queryParams]="ObjectWithAllOptionalParams"
// e.x <a routerLink="/followers" [queryParams]="{ page:1, order:'newest'  }"  >Followers</a>
// The value of these keys can be dynamically => we dont have to hard code here 

// In github-followers.component.ts
// We need to inject the ActivatedRoute service 
// In ngOnInit => get the optinal params very similar to required param => to required params we used this.route.paramMap 
// Getting query params is very similar => Instead of using .paramMap property => use .queryParamMap => This is an observable
// scenario of pagination => where you have page numbers and sort order => Is very likely user is going to get back to the same component
//                          somewhere is going to be pagination component with page number => when user clicks on page number => it will stay on the same page but rout params will change
//                          in most cases we will have to subscribe to observable 

// if we have:
// thir.route.paramMap.subscribe()
// this.route.queryParamMap.subcribe()
// How can we get subscribe both required and query params ? and then call the server and get the list of followers ? Next lecture



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
        <li routerLinkActive="active current" >
            <a routerLink="/followers">Followers</a>
        </li>        
        <li routerLinkActive="active current" >
            <a routerLink="/posts">Posts</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

//--------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------Home component---------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubProfile component-------------------------------------------------------------


//github-profile.component.html

// <p>
//     github-profile works
// </p>
// <button [routerLink]="['/followers', 1234]" class ="btn btn-primary">Next</button>



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
            let id = +params.get('id');
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
//       <a [routerLink] = "['/followers',follower.id, follower.login]">{{ follower.login }}</a>             ///routerLink for raw parameters
//     </h4>
//     <a href="follower.html_url">{{ follower.html_url }}</a>
//   </div>
// </div>


//github-followers.ts

import { GithubFollowersService } from './../services/github-followers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'github-followers',
  templateUrl: './github-followers.component.html',
  styleUrls: ['./github-followers.component.css']
})
export class GithubFollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,  
    private service: GithubFollowersService) { }

  ngOnInit() {

    this.route.paramMap
        .subcribe(params => {

        });
    
    this.route.queryParamMap
        .subcribe(params => {

        });

    this.service.getAll()
      .subscribe(followers => this.followers = followers);
  }
}



//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
