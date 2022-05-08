
// At this point we effort to show/hide part of page  and also protecting routes
// But when it comes to implementing authenthication and authorization in real app => we should also know how to access protected API Resources
// e.x => in admin page => we have list of orders => this list suppose to come from API endpoint 
//     => so this API endpoint should only be accessible to logged in user who are part of Admin role
//     => Currently we dont see this list of orders => next we fix it

// In fake-backend.ts
// We can see in the body => the fake implementation of /api/orders
// here => we look at request header => if we have a header by authorization name => and if value of header is 'Bearer '+token
//        then we are going to send the response with status 200 and body of rqeuest => include our orders[1,2,3]

// Now in order.service.ts
// We have a getOrders() method => we send a http request to orders endpoint
// The reason currently we dont see list of orders => because we have not included the authorization header 
// To add the authorization header to this request:
// 1. get toke from local storage
// 2. create Headers Object  => object has a method called append(name,value) => name is 'authorization' => value is 'Bearer ' +token
//    remember import on top to use header from angular => not use the defined natively in our browser => import {  Headers } from '@angular/http'

// 3. Then create a RequestOption object => this is defined in angular/http 
//    toinitiliaze this object => pass an object =>  with headers property set to the header object created in 2. => { headers: headers }
// So pass this object as second parameter to get request:
// return this.http.get('/api/orders', options)

// Test ! => we see on /admin => the list of orders
// So when building API on the server => if we want to secure certain API endpoints => ensure the reason Authorization header on the request
// And the value of this header should be Bearer with a valid JWT => this means on the Client => in angular app => whenever we need to access protected API endpoints => should always supply authorization header
// But we can see writing all this code in multiple places can be repetitive and time consuming
// In angular2-jwt => we have a class called AuthHttp   => import { AuthHttp } from 'angular2-jwt'
// So in the constructor of order.service.ts => we change Http(Angular) => to AuthHttp
// This class has the exact same interface that Http Class in Angular => so if we type this.http. => we can see all same methods 
// However all these methods internally => implements some logic like:
// ... get token from localstorage, add it as authorization headers to request 
// So delete all code => and remove the 2nd parameter(options) added to .http.get() 
// All is just use this AuthHttp class 

// However if we need to use the standard Http service in other methods in the same class => maybe access certain APIendpoints that are not protected
// so we can have 2 parameters in constructor => (private authHttp: AuthHttp, private http: Http) 





//-----------------------home.component---------------------------------------------

<h1>Home Page</h1>
<p *ngIf="authService.isLoggedIn()" >
  Welcome{{authService.currentUser.name}}
</p>
<ul>
  <li *ngIf="authService.isLoggedIn() && authService.currentUser.admin"><a routerLink="/admin">Admin</a></li>
  <li *ngIf="!authService.isLoggedIn()" ><a routerLink="/login">Login</a></li>
  <li *ngIf="authService.isLoggedIn()" ><a>Logout</a></li>
</ul>


import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private authService: AuthService) { }
}


//--------------------------------------------------------------------------------------


//------------------------admin.component---------------------------------------------

<h1>Admin</h1>
<h2>Orders</h2>
<ul>
  <li *ngFor="let order of orders">{{ order }}</li>
</ul>



import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  orders: any[];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders()
      .subscribe(orders => this.orders = orders);
  }
}

//-----------------------------------------------------------------------------------------

//-----------------------login.component---------------------------------------------------

<form class="form-signin" #f="ngForm" (ngSubmit)="signIn(f.value)">
  <h2 class="form-signin-heading">
    Please sign in
  </h2>

  <div *ngIf="invalidLogin" class="alert alert-danger">
    Invalid username and/or password.
  </div>

  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" name="email" ngModel class="form-control" placeholder="Email address" required autofocus>

  <label for="inputPassword" class="sr-only">Password</label>
  <input type="password" id="inputPassword" name="password" ngModel class="form-control" placeholder="Password" required>

  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>


import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalidLogin: boolean; 

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result)
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate(returnUrl || ['/']);
        else  
          this.invalidLogin = true; 
      });
  }
}

//------------------------------------------------------------------------------------------

//-----------------------signup.component--------------------------------------------------
<p>
  signup works!
</p>


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


//------------------------no-acess.component-----------------------------------------------


<h1>Access Denied</h1>



import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.css']
})
export class NoAccessComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


//-----------------------------------------------------------------------------------------


//-----------------------not-found.component----------------------------------------------
<p>
  not-found works!
</p>


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


//------------------------services/order.service.ts--------------------------------------------------

import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt'
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private authHttp: AuthHttp, private http: Http) {
  }

  getOrders() { 
    
    // let headers = new Headers();
    // let token = localStorage.getItem('token');
    // headers.append('Authorization','Bearer '+token);

    // let options = new RequestOptions({ headers:headers })

    // return this.http.get('/api/orders', options)
    //   .map(response => response.json());

    return this.authHttp.get('/api/orders')
      .map(response => response.json());
  }
}
//-----------------------------------------------------------------------------------------


//---------------------------services/auth.service.ts----------------------------------------------------

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials))
      .map(response => {
          let result = response.json();
          if (result && result.token){
              localStorage.setItem('token', result.token);
              return true;
          }
          return false;
      })
  }

  logout() { 
  }

  isLoggedIn() { 

    return tokenNotExpired();
    }

    get currentUser(){
        let token = localStorage.getItem('token');
        return new JwtHelper().decodeToken(token);
    }
}

//----------------------------------------------------------------------------------------

//------------------------services/auth-guard.service.ts--------------------------------------------------       


import { Injectable } from '@angular/core';

@Injectable()
// export class AuthGuardService {
export class AuthGuard implements CanActivate {

  constructor(
      private router: Router,
      private authService:AuthService
  ) {
  }

  
  canActivate(route, state:RouterStateSnapshot){
    if (this.authService.isLoggedIn()) return true;
    //   if (this.authService.isLoggedIn()) return true;

    //   this.router.navigate(['/login']);
      this.router.navigate(['/login', {queryParams:{returnUrl: state.url}}]);
      return false;
  }

}
//-----------------------------------------------------------------------------------------

//------------------------services/admin-auth-guard.service.ts--------------------------------------------------      


import { Injectable } from '@angular/core';

@Injectable()
// export class AuthGuardService {
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService:AuthService
 
  ) {}
  
  canActivate(){
    let user = authService.currentUser;
    if (user && user.admin) return true;
    // if (this.authService.currentUser.admin) return true;
    this.router.navigate(['/no-access']);
    return false;
  }


}
//-----------------------------------------------------------------------------------------


//-----------------------------helpers/fake-backend.ts----------------------------------
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
        
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vc2ggSGFtZWRhbmkiLCJhZG1pbiI6dHJ1ZX0.iy8az1ZDe-_hS8GLDKsQKgPHvWpHl0zkQBqy1QIPOkA';
    
  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an 
    // asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'mosh@domain.com' && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



       // 
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') && 
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};
//----------------------------------------------------------------------------------------