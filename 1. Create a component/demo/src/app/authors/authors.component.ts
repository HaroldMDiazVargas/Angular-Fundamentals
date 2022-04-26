import { EmailService } from './../email.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  // template: ,
  
})
export class AuthorsComponent implements OnInit {
  authors;
  constructor(service:EmailService ) {
          this.authors = service.getAuthor();
   }

  ngOnInit(): void {
  }

}
