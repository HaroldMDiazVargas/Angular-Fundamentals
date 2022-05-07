// Configurate the initial stater point:

// Create:
// 1. HomeComponent
// 2. AdminComponent
// 3. LoginComponent
// 4. Signup component
// 5. Notaccess component
// 6. Notfound component
// 7. OrderService => Very simple for getting the list of orders from the server 
// 8. AuthService => For implementing login and logout
// 9. fakeBackendProvider       // These 5,6 and 7 are for implementing  a mock(simulated) back-end. No need these in real app
// 10. MockBackend
// 11. BaseRequestOptions
// Configurate in app.module the routes and providers
// On imports[]:
// RouterModule.forRoot([
//     { path: '', component: HomeComponent },
//     { path: 'admin', component: AdminComponent },
//     { path: 'login', component: LoginComponent },
//     { path: 'no-access', component: NoAccessComponent }
//   ])
// // On providers[]:
// [   OrderService,
//     AuthService,

//     // For creating a mock back-end. You don't need these in a real app. 
//     fakeBackendProvider,
//     MockBackend,
//     BaseRequestOptions
//   ]

// Analyze the fake-backend.ts:,
// We export function called fakeBackendFactory(MockBackend, BaseRequestOptions) 
// we declare a variable token => set to a valid JWT extracted from jwt.io

// We starts with the fake implementation of /api/authenticate
// We have basic logic to check the url of the request => endsWith && request method is Post=> this means client has sent an HTTP Post Request to this endpoint
// Here we want to validate username password => if is valid => return JWT => 
// We hard-code email and password => If client sent these credentials => return a Response => And set the status of Response to 200 and in body put this token
//                                => otherwise return a Response without a token => Here we set status to 200 => it would be better to set 400 => doesnt matter for this purpose


// Then we make fake implementation of /api/orders
// It's very similar:
// define the APIendpoint => then checking to see if we have authorization header in the request => IF we have auth header and in this header we have valid token => then response list of orders
//                        => here we have a response object with => status 200 and in body the orders([1,2,3]) => in real app return order Object 
//                        => ELSE we respond with status 401 => means unauthorizate 
// In a real world app => All this logic is implemented on Server not on the Client
// All this logic is rapped with a setTimeout(allPreviousLogic, 1000) function => We use it to simulate an asynchronous call to server that takes 1 second(1000ms).

// At the end of the file we have a Provider Object:
// export an Object called fakeBackendProvider => has 3 properties:
// 1.provide: Http
// 2.useFactory: facekBackendFactory 
// 3.deps: [MockBackend, BaseRequestOptions] => represent dependencies of our factory function => Angular needs to know these before it can call this factory function

// In app.module
// Early we use in providers array[] => { provide: ErrorHandler, useClass: AppErrorHandler}(PROVIDER OBJECT) => To teel Angular wherever need to provide ErrorHandlers use instead AppErroHandler
// In the provider object => Instead of useClass => set to useFactory => We set to a function that will create an instance of this class.

// So in our provider object => we are telling Angular wherever need to inject an instance of Http class => Use faceBackenFactory function => REMEMBER: Factory methods/functions create objects
//                          => to create an instance of Http class
// We can see that in the end of the body of our factory function => we return a new Htpp Object an as arguments we are passing:
// backend => 
// options =>
// These arguments are the same we are passing to the function at the top => we take these and modify them to respond to those fake API endpoints
// An finally at the end of the function => return new Http with these arguments
//





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
  <h2 class="form-signin-heading">Please sign in</h2>
  <div *ngIf="invalidLogin" class="alert alert-danger">Invalid username and/or password.</div>
  <label for="inputEmail" class="sr-only">Email address</label>
  <input type="email" id="inputEmail" name="email" ngModel class="form-control" placeholder="Email address" required autofocus>
  <label for="inputPassword" class="sr-only">Password</label>
  <input type="password" id="inputPassword" name="password" ngModel class="form-control" placeholder="Password" required>
  <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
</form>


.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }
  .form-signin .checkbox {
    font-weight: normal;
  }
  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-signin .form-control:focus {
    z-index: 2;
  }
  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }


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
      JSON.stringify(credentials));
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