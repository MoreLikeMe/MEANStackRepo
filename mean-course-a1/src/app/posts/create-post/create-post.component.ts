import { Component } from '@angular/core';

import { PostService } from '../posts.service';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class createPostComponent {

  constructor(public postService: PostService) {}
  addNewPostClick(form : NgForm){
    if(form.invalid){
      return ;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
