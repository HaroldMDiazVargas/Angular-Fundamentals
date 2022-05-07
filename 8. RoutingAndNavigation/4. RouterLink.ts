
// Currently we have 2 links in the navbar => followers and posts => each one have 'href' attribute 
// In angular apps we dont use this attribute => because with this type of navigation everytime we click on a link => The entire page is downloaded
// So, the angular app is reinitilize => So every click action over a link => page goes blank for a seconds => as app grows the cost is higher
// So, the delay is going to be more => If we see devtool every time click on a link => All resourcers in our app are redownloaded(bundles,etc)
// When we click on a link => you need only content of that page to be downloaded => Not the entire app, entire resources


// Instead of "href" attr => use the routerLink Directive defined in router module
// Go to browser => clear all the resources download in DevTool => select followers link => See that navbar never disappeared => page didnt go blank
// An in network tab => Only see the content of the page => Not see any js bundle, not css  => they were downloaded in first time 
// We refer to this apps like => Single Page Applications (SPA)
// Essentially a single page is downloaded from the server => And as the user navigate from one page to another => Only the content of target page is downloaded

// Now add link in github-followers.html => replaces href with routerLink => // <a routerLink="dynamic">{{ follower.login }}</a> => This is a link for each follower
// However this time we are dealing with dynamic url => so the parameter e.x "/followers/1" => should be render dynamically(here the parameter for example is 1)
// When we are dealing with route parameters => instead of using routerLink as attribute => We use the property binding syntax => and binding to an expression
// <a [routerLink]="expression">{{ follower.login }}</a> => <a [routerLink]="['/followers', followers.login]">{{ follower.login }}</a> 
// In the array:
// 1rst element => path => '/followers'
// After this 1st element => Add all route parameters => currently we have only 1 route parameter => follower.login(username) or follower.id(userID)
// Now if we click on browser => localhost:4200/followers/10586972 

// Recap:
// For simple routes => Use routerLink directive as attribute => Set to string value
// For route parameters(dynamic) => Use routerLink directive as property binding => Set the property to an array "['path', rawArguments...]"




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
        <li class="active"><a routerLink="/followers">Followers</a></li>         //Using routerLink directive instead href
        <li><a routerLink="/posts">Posts</a></li>
      </ul>
    </div>
  </div>
</nav>

//--------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------Home component---------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubProfile component-------------------------------------------------------------


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
