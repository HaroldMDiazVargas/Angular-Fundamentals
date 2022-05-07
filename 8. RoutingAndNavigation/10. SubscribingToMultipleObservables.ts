// How subscribe to 2 different observables at the same time:
// An observable is a string or asynchronous data that arrives over time
// Instead of having 2 separate subscription to these observables => Combine these observables into new observable => then subscribe to that observable

// In github-followers.component.ts
// import { Observable } from 'rxjf/Observable'
// import 'rxjs/add/observable/combineLatest'  => Factory method(static) for combining multiples observable
// now in ngOnInit => call Observable.combineLatest(AnArrayOfDifferentObservables)
// Then use .subcribe(combined => {  });
// combined is an array with 2 elements:
// 1rst element => latestParamObject => combined[0].get('id') => Here we can get all the required params
// 2nd element => latestQueryParamObject => combined[1].get('page') => Here we can get all the optional params
// In this example we dont have an id pass to follower page => But thats how we can access to all the params
// We can use service to get the data from the server => Our code will look something like:
// this.service.getAll({id:id, page:page}) => In this case we dont have this service is just for demostration

// This is end results;
// 1. we combine multiple observables
// 2. we subscribe to them 
// 3. Use service to get data from the server

// In this implementation => we have a subscribe inside another subscribe => ugly 
// We can write cleaner and elegant way with reactive extensions.







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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

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

    Observable.combineLatest([
        this.route.paramMap,
        this.route.queryParamMap
    ])
    .subcribe(combined => {
        let id = combined[0].get('id');
        let page = combined[1].get('page');

        // this.service.get({ id:id, page:page })

        
        this.service.getAll()
            .subscribe(followers => this.followers = followers);
    });

  }
}



//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
