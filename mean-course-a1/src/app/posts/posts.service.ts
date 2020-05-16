import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PostService{
private post: Post[] = [];
private updatedPost = new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router) {};

getPosts(){
  this.http.get<{message: String, posts: any}>(
    'http://localhost:3999/api/post'
    )
  .pipe(map((postData) =>{
    return postData.posts.map(posts => {
      return {
        title: posts.title,
        content: posts.content,
        id: posts._id
      };
    })
  }))
  .subscribe((transformedPosts) =>{
    this.post = transformedPosts;
    this.updatedPost.next([...this.post]);
  });
}

getPost(id: String){
    return this.http.get<{_id: String, title: String, content: String}>('http://localhost:3999/api/post/' + id);
}

getUpdatedPostListener(){
  return this.updatedPost.asObservable();
}

addPost(title: String, content: String){
  const p : Post = {id: null, title: title, content: content};
  this.http.post<{message: String, postId: String}>('http://localhost:3999/api/post', p)
  .subscribe((responseData) =>{
      console.log(responseData.message);
      p.id = responseData.postId;
      this.post.push(p);
      this.updatedPost.next([...this.post]);
      this.router.navigate(["/"]);
  })

}

updatePost(id: String, title: String, content: String){
  const post : Post = {id: id, title: title, content: content};
  this.http.put('http://localhost:3999/api/post/' + id, post)
  .subscribe(response => {
    console.log(response);
    this.router.navigate(["/"]);
  });
}

deletePost(postId: String){
  this.http.delete<{message: String}>('http://localhost:3999/api/post/' + postId )
    .subscribe(responseData => {
      const afterDeletionPosts = this.post.filter(p => p.id!=postId);
      this.post = afterDeletionPosts;
      this.updatedPost.next([...this.post]);
    })

}

}
