// Simple app to work => Nav bar with two links:
// Folowers link => What we made with consuming http services 
// Posts link

// In followers page => localhost:4200/followers => List of all folowers obtain with get Request
// If we click over one follower => localhost:4200/profile/Harold/10586972?foo=bar => It's a different URL
// This URL has two parameters:
// 1. Username: Harold
// 2. User ID: 10586972
// After these parameters we have => Query string => '?' question mark with 1 Query string parameter => foo
// The idea is implements routes with multiple parameters  and query strings

// In posts page => localhost:4200/posts

// Configuration:
// 1. Create with ng cli => Navbar, Home, GitHubProfile and NotFound components
// 2. In Navbarcomponent => HTML markup => Put simple navbar using bootstrap
// 3. Import in app.module.ts {RouterModule} from '@angular/router' => 
// 4  Then go to imports[] => RouterModule.forRoot() => Static method=> Used to define root routes of our app
//    As soon as our app grows => we want to break app into smaller more managable modules => In each module we are going to have a set of routes for that particular area of the app
//    Instead of using forRoot() => We are going to use forChild() => For now dont worry about it
//    RouterModule.forRoot(PassAnArrayOfRoutes) => Each route is an object with 2 properties: Path and Component
//    With these properties we are telling Angular router => Whenever the brower address changes to this Path => Display this Component
//    None of our routes start with a slash(/) => So in path property not starts with slash 
// 5. Add first route for home page =>  RouterModule.forRoot([{path: '', component: HomeComponent]})=> Empty path represents the home page or default route
// 6. Add second route for followers page => ... ,{path: 'followers', component: GitHubFollowersComponent})
// 7. Add third route for see profile of one follower => ...,{path: 'profile/:username', component: GitHubProfileComponent})
//    To add parameter in path => we use ':' => and then we add the name of the parameter => e.x :username
// 8. Add fourth rouse for posts page => ...,{path: 'posts', component: PostsComponent})
// 9. If user navigate to an URL is not a valid route => Display typical not foung page => ...,{path: '**', component: NotFoundComponent})
//   '**' => Represent wildcard => Catches any URLs in the brower address
// The order of routes is important => If we put the last route at begining => The wildcard is going to catch any route => Always going to see NotFound page
// Another example if we change the path of third route to => ...,{path: 'followers/:username', component: GitHubProfileComponent}) 
// ... When we navigate to followers/ anything => the path of second route will match the URL => And as result GitHubFollowers component will be display
// ... We will not be able to look at profile of a given follower => we need to put MORE SPECIFIC routes on the top =>...,{path: 'followers/:username', component: GitHubProfileComponent}) (move to 2nd route)
// ... Now GitHubProfile will be show when we look at profile of a given follower
// 10. Reformat the code

//-------------------------------------------------------navbar component--------------------------------------------------------------------
// Create a navbar.component.ts

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
        <li class="active"><a href="#">Followers</a></li>
        <li><a href="#">Posts</a></li>
      </ul>
    </div>
  </div>
</nav>

//--------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------Home component---------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubProfile component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
