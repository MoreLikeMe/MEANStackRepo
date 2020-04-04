import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostService{
private post: Post[] = [];
private updatedPost = new Subject<Post[]>();

constructor(private http: HttpClient) {};

getPosts(){
  this.http.get<{message: String, posts: Post[]}>('http://localhost:3999/api/post')
  .subscribe((postData) =>{
    this.post = postData.posts;
    this.updatedPost.next([...this.post]);
  });
}

getUpdatedPostListener(){
  return this.updatedPost.asObservable();
}

addPost(title: String, content: String){
  const p : Post = {id: null, title: title, content: content};
  this.http.post<{message: String}>('http://localhost:3999/api/post', p)
  .subscribe((responseData) =>{
      console.log(responseData.message);
      this.post.push(p);
      this.updatedPost.next([...this.post]);
  })

}

}
