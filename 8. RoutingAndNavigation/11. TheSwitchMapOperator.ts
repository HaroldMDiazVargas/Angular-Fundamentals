// So in github-followers.component.ts => we have a subscribe inside another subscribe
// We can see this pattern in a lot real app 
//

// In data.service.ts
// The return type o f getAll() method => An Observable<any> => So here we have a collection => An in this collection every item its type is any
// This Observable<any> is because the .map operator => If we comment it => we will se that return type is an Observable<Response>
// So in conclution we're mapping Response Object => to new Object of type Any 

// Now In github-followers.component.ts
// if we see the type of combined parameter => Is ParamMap[] => We're subscribing to an observable => every item of this observable is a type ParamMap[]
// So, similar like we used .map operator in data.service.ts => we can use it to map a ParamMap[] into Followers[]
// So, on top import two operators=> import 'rxjs/operator/map'; import 'rxjs/operator/switchMap';
// Now, after we combined the observables and before subscribe operator => apply .map operator => input is ParamMap[] => .map(combined =>{})
// at this point we need to call the server to get the list of followers and return it => Then we will subscribe to that observable => an at the results we get the list of followers
// So we cut all the code inside the first .subcribe and move inside the .map operator code block  => and return this.service.getAll(); => this return typ is Observable<any>
// Inside the .map operator => we dont need the subscribe anymore => because in this .map operator the intention is return the list of followers
// Now in the subscribe after map operator => change combined to followers => because we get the list of followers
// and then used it to set this.followers
// At this point => we have a compilation error => we used .map operator to convert => paraMap[] into an Observable<any>
// In other words => when we subscribe to this Observable => every item in this observable is going to be an observable<any> => Is like to have a collection inside another collection
// We want instead followers[] not Observable of followers[] => So instead of .map operator => use .switchMap


// So in conclution:
// More clean way
// More elegant way
// To combine multiple observables => call the server => subscribe to the result => and initialize a field in this class





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
    .switchMap( combined => {
        let id = combined[0].get('id');
        let page = combined[1].get('page');
        // this.service.get({ id:id, page:page })

        
        return this.service.getAll()
            // .subscribe(followers => this.followers = followers);
    } )
    .subcribe(followers => this.followers = followers);

  }
}



//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
