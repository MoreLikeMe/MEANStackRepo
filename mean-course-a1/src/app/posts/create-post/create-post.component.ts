import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class createPostComponent {
  enValue = "";
  newPost = "No Content";
  addNewPostClick(){
    this.newPost = this.enValue;
  }
}
