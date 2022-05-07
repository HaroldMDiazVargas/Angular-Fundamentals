// First we need to know what happen to our components during navigation => 
// e.x1 If we goes from pageA(componentA) to pageB(componentB) => Angular use LifeCycleHookd onDestroy on page A(remove from DOM) and OnIinit(to init and render)
// e.x2 Imagine pageA about trasaction with two buttons(back and next) => it goes to back or next transaction but tecnhically is on the same page
//      in this case doesnt make Angular to destroy this component only to recreate this part.
//      In this case we have the same component instance but with different route parameters => This is reason why parameters are defined as observable
// An observable => Is tecnhically a collection of asyncronus data that arrives over time
// In the httpconsume section => we simple subscribe to observable to get response from server => here we only have 1 item or object in our observable => the response from server
// But we can use observable => to model strings or asyncronous data => Data comes into this string => any who has subscribed to the observable => will be notify

// in github-profile.component.ts
// we are subscribe to paramMap observable => so this component is an observer of this observable => any time there is new data in this collection => this component will be notify
// as methpor => main list of a blog => any time there is a new post you will be notify => the same concept

// .paramMap => collection of route parameters that can change over time => everytime there is new route param will be notify
// If we make the next experiment:
// Go to a profile user => So the githubfollowers component was destroy => And instead githubprofile component was initialize and place on DOM
// If we come back to followers => and again => go to 2nd follower so githubprofile component in on init=> we can see that githubprofile component was initialize 2 times
// So everytime we navigate away from any follower and come back =>  githubprofile component  is re-initialize
// So give the user the ability to stay on the same component and navigate back and forward => the component is stay on DOM but route parameters are gonna change
// With this implementation => we will see only 1 OnInit message on the console => the component instance is not goint to re-initialize

// In github-pofile.html
// put button => with [routerLink] => some magic number as a parameter e.x 1234 => when click will be on the same page, but route param will change
// localhost:4200/followers/5821291   => click => localhost:4200/followers/1234  => route parameter change and in console only have 1 init message => angular not destroys component

// If we have an app with this kind of navigation built-in to it => because ngOnit is call only once => In order to get access to route params
// we need to subscribe to the route map observable => thats the reason we have the code in ngOnInit => this.route.paramMap.subscribe()

// But in an app => we dont have kind of scenario to allow the user stay on the same page and navigate back and forward => there's simple way to access to route params
// If 100% sure => user has to naviagate away of this page => Instead of subscribe to observable => we can use Snapshot
// this.route.snapshot.paramMap => This is the actual paramMap object and not an observable 
// this.route.snapshot.paramMap.get('id')







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
//       <a [routerLink]="['/followers', follower.id]">{{ follower.login }}</a>             ///routerLink for raw parameters
//     </h4>
//     <a href="follower.html_url">{{ follower.html_url }}</a>
//   </div>
// </div>


//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
