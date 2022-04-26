import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  authors = ['author1','author2','author3' ];
  // constructor() { }

  getAuthor(){
    return this.authors;
  }
}
