import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {

  coursesCategories = [
    {id:1,name:'Development'},
    {id:2,name:'Art'},
    {id:3,name:'Language'}
  ]

  constructor() { }

  log(g:any){
    console.log(g)
  }


}
