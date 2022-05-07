
// Work with routes with multiple parameters
// In a particular profile page => we have localhost:4200/followers/idOfFollower
// As a tecnhiuqe to improve search engine optimization => Decide to add username of each follower in the url e.x localhost:4200/followers/username/idOfFollower
// This tecnhique is used by stackoverflow for search engine optimization => https://stackoverflow.com/questions/questionID/titleOfQuestion

// In app.module.ts => modifie the route:
//{path:'followers/:id/:username', component: GitHubProfileComponent}

// In github-followers.component.html:
// follower.login => property returned from github => includes the username 
// [routerLink] = "['/followers",follower.id, follower.login]"





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


//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
