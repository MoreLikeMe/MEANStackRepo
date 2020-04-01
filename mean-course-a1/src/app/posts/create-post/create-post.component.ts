import { Component, EventEmitter, Output } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class createPostComponent {
  enValue = "";
  tiValue = "";
  newPost = "No Content";
  @Output() postEventEmitter = new EventEmitter();
  addNewPostClick(){
    const post : Post = {
      title: this.tiValue,
      content: this.enValue
    }
    this.postEventEmitter.emit(post);
  }
}
