
// In home.component.html => where we have the logout link
// here we want to call the logout method of authservice 
// So in home.component.ts => at this point only we have injected the authservice
// again in home.component.html => add (click) event binding to => authService.logout()

// So in auth.service.ts
// All we have to do is to delete token for the local storage => because the existence of a valid token inside local storage means we have a logged in user
// user localStorage.removeItem('token')
// test this by lookin in Application tab on DevTool

// Now logout link works properly => we need to show or hide these links depending of the Authentication Status of the user 







//-----------------------home.component---------------------------------------------

<h1>Home Page</h1>
<p>
  Welcome [NAME]
</p>
<ul>
  <li><a routerLink="/admin">Admin</a></li>
  <li><a routerLink="/login">Login</a></li>
  <li><a>Logout</a></li>
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
    return false;
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