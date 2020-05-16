import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class listPostComponent implements OnInit, OnDestroy{
  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

  private postSub : Subscription;
  isLoading = false;
  ngOnInit(){
    this.isLoading = true;
    this.postService.getPosts();
    this.postSub = this.postService.getUpdatedPostListener()
    .subscribe((pos : Post[]) => {
         this.isLoading = false;
         return this.posts = pos;
       });


  }

  onDelete(postId: String){
    this.postService.deletePost(postId);
  }

  posts: Post[]=[];
  //posts = [];
  constructor(public postService: PostService) {}


}
