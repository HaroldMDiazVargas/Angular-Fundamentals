
// If we manually write localhost:4200/admin => we redirect to log in page
// When we log in => I go to homepage => In terms of UX => would be nicer if i get back redirected to admin page 
// So, when we take user to log in page => we should also pass a query parameter like returnUrl => with this when user sucessfully logs in => we can take him back where want to go

// In auth-guard.service.ts
// So in this.router.navigate => pass the second parameter => object with one property => queryParams => { returnUrl: WhatShouldBeHere?}
// we saw before => canActivate method recibe 2 params => one is route and the other is state:RouterStateSnapshot
// With state parameter we can get access to the URL that user wanna to access
//  So set the value of returnUrl property => queryParams => { returnUrl: state.url }

// Now in login.component.ts
// Get this query parameter 
// In order to access route params => inject the ActivatedRoute service into the constructor of this class
// And in our signIn method => when user sucessfully log in => instead of navigate to homepage => check the query params => if we have returnUrl => we want to send the user to that url
// otherwise send user to homepage
// Here we can use snapshot => this.route.snapshot  => becase here we dont have a button or link that takes the user to the same page(not need observable => avoid subscribe to queryparams observable)
// this.route.snapshot.queryParamMap.get('returnUrl');
// The change navigate => to returnUrl || homepage

// Final test both scenarios
// 1. Go to admin manually => so it carries to log in page => then it takes user to admin page
// 2. Now go to log in page from homepage => so it carries to homepage






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

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  getOrders() { 
    return this.http.get('/api/orders')
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

//------------------------services/auth-guard.service.ts--------------------------------------------------       //NEW SERVICE HERE


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

    //   this.router.navigate(['/login']);
      this.router.navigate(['/login', {queryParams:{returnUrl: state.url}}]);
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