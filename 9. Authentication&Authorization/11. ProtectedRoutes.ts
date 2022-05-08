
// Now lets make admin route accesible only to users with the admin role
// Currently anyone who is logged in => can write address to localhost:4200/admin

// To fix this:
// In app.module.ts => we applied early in RouterModule.forRoot() on admin route => canActivate: [AuthGuard] 
// So in this array[] => we can have multiple guards => these guards are applied in sequence:
// 1rst we need our AuthGuard to be apply => ensure only logged in users can access this route
// Another guard we want to implement => ensure only admin users can access to this route

//In terminal generate new service => ng g s services/admin-auth-guard
// In admin-auth-guard.service.ts:
// Implements CanActivate interface 
// constructor inject => route:Router(for navigate the user) and authService:AuthService
// In canActivate method:
// check if user is admin or not => this.authService.currentUser. => here we dont have intellisense => because we havent annotated this property => in future we can define an interface=> apply to this property
// this.authService.currentUser.admin => if this is true => return true (user can access this rouse)
// otherwise navigate user => to permission denied page => this.router.navigate(['/no-access'])
// Finally return false

// So in app.module =>   in RouterModule.forRoot() on admin route => Apply the 2nd guard => canActivate: [AuthGuard, AdminAuthGuard] 
// So AdminAuthGuard => apply after AuthGuard 
// In providers[] => register this guard 

// here => this.authService.currentUser.admin => we are assuming that currentUser has a value => but this can be null if user is not logg in
// This is not an issue => because we applied AdminAuthGuard after AuthGuard => So this code is executed only if user is logged in
// But to make this a little more robuts => better change if statement and ensure the current user is not logged
// extract a variable user = this.authService.currentUser to refactor the code 


// Test!
// Change admin property => in jwt.io => generate new token using same secret => paste in fake backend
// Look log in => but like user is not admin => There is not admin link in home page => if manully write /admin address => get Acces Denied page







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