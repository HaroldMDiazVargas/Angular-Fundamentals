import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  @Input("isSelected") isSelected = false;
  @Input("likesCount") likesCount = 0;
  constructor() { }

  ngOnInit(): void {
  }

  clicked(){
    this.likesCount += this.isSelected ? -1:1;
    this.isSelected = !this.isSelected;
    // this.likesCount === 0 ? this.likesCount++:this.likesCount--;
  }

}
