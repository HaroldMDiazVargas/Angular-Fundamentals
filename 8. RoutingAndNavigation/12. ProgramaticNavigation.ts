// There're times you want to let nivagate the user programatically 
// e.x profile page(one random follower) => add submit button => 
// when user click on it=> call the server and update user profile => then eventually we want to navigate them back to the list of followers
// And in followers page => we also have these query params in the url(page and order)

// So in github-profile.component:
// In constructor inject the Router Service  as private
// Implement submit method => this.route.navigate(): 
// 1rst argument => pass an array of link parameters ['/followers', ...anyRequiredParams] => the same kind of array we used for the routerLink directive
// 2nd argument => navigation extra object => in this object we have a property called  queryParams => and set it to an object
//              => this object has two properties => page and order => {page:1, order:'newest'} => exactly like we have in markup
// Now test it!

    





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

//   constructor(private route:ActivatedRoute) { }          //COMMENT THIS FOR THIS LECTURE

//   ngOnInit() {
//       this.route.paramMap
//         .subscribe(params => {
//             let id = +params.get('id');
//             console.log(id);
//             // service.getProfile(id);      to send to server and show the profile in real app

//         });
//   }


    constructor(private router: Router){}

    submit(){
        this.router.navigate(['/followers'],{
            queryParams: { page:1, order:'newest' }
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
