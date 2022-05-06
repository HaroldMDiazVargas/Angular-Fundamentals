
// In browser we're going to see an error => Generic error handler and display unexpected error => In console => Cannot find primary outlet to load 'HomeComponent'
// We go to app.html and add <route-outlet> element => This is a Directive defined in router Module
// When Angular sees this => render the component associate with current route after <route-outlet> element => Not inside
// Now go to browser and probe the differents routes => must working properly




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
        <li class="active"><a href="#">Followers</a></li>
        <li><a href="#">Posts</a></li>
      </ul>
    </div>
  </div>
</nav>

//--------------------------------------------------------------------------------------------------------------------------------------


//--------------------------------------------------Home component---------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------GitHubProfile component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------NotFound component-------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------
