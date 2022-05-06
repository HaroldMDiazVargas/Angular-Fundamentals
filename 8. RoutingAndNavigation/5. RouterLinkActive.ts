
// Currently we have a problem => In the navbar => The followers link is always highlighted => Is we go to posts link => it's still selected
// In navbar we have associate to followers <li> =>  class="active" => part of bootstrap => we want to apply this dynamically
// We have another directive called => routerLinkActive => To set the css class for a selected link
// routerLinkActive ="listOfCssClass" => list of css classes should be apply when this link is activated
// routerLinkActive="active current"  => Apply the same directive to the second <li> corresponding to posts








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
