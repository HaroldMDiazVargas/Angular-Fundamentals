
// When we login => we dont want to see login link again
// When we logout => we shouldnt see the admin and logout links

//In auth.service.ts
// We have method isLoggedIn() => we want to get our token => decoded => get its expiration date and if it isn't expired => means the user is log in
// In other words => we have a valid token in local storage => this token is not expired => means user is log in => we should return tru => otherwise return false

//In order tu work with JWT => we use one of the libraries jwt.io => In angular app we need to install a library called angular2-jwt
// To install this library =>  open terminal => npm install angular2-jwt --save 
// So in isLoggedIn method => create an instance of JwtHelper() class 
// Also get the token which is inlocal storage => localstorage.getItem('token')
// we need to check if(!token) => return false => otherwise use jwtHelper instance
// this jwtHelper. object has few different methods:
// 1.decodeToken
// 2.getTokenExpirationDate(passToken) => null by default => doesnt have expiration date
// 3.isTokenExpired(passToken) => return boolean => if is false means user is logged in
// 4.urlBase64Decode
// Final return !isExpired; => this means user is logged in 

// Now in home.component.html 
// Render links dynamically:
// <li *ngIf="authService.isLoggedIn()"> => render admin link if user is logged in

// When we generate tokens on the server using one of the libraries provided by jwt.io => we can set the expiration date of our token

// There's a easier and cleaner way to implement isLoggedIn method =>  Using one of the global helper function provided by angular2-jwt => tokenNotExpired()
// This function is exactly what we did before => extract token for localStorage => check if is falsy => looks at expirationDate => and returns boolean
// So just return tokenNotExpired() => This means user is logged in


// Finally put *ngIf for the three <li> in home.component.html


//-----------------------home.component---------------------------------------------

<h1>Home Page</h1>
<p>
  Welcome [NAME]
</p>
<ul>
  <li *ngIf="authService.isLoggedIn()"><a routerLink="/admin">Admin</a></li>
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
    private router: Router, 
    private authService: AuthService) { }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => { 
        if (result)
          this.router.navigate(['/']);
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

    // let jwtHelper = new JwtHelper();  
    // let token = localStorage.getItem('token');
    // if(!token)
    //     return false;
    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);
    
    // return !isExpired;
    }
}

//----------------------------------------------------------------------------------------

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