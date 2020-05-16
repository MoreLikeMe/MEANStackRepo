import { Component, OnInit } from '@angular/core';

import { PostService } from '../posts.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class createPostComponent implements OnInit{

  constructor(public postService: PostService, public route: ActivatedRoute) {}

  post : Post;
  form : FormGroup ;
  private mode = 'create';
  private postId: String;
  isLoading = false;
  imagePreview: string;

  ngOnInit(){
    this.form = new FormGroup({
      title: new FormControl(null,
         {validators: [Validators.required, Validators.minLength(3)]}),
      content: new FormControl(null,
        {validators: [Validators.required]}),
      image: new FormControl(null,
        {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((parammap : ParamMap) => {
      if(parammap.get('postId')){
          this.mode = 'edit';
          this.postId = parammap.get('postId');
          this.isLoading = true;
          this.postService.getPost(this.postId)
              .subscribe(postData => {
                this.isLoading = false;
                this.post = {
                  id: postData._id,
                  title: postData.title,
                  content: postData.content
                };
                this.form.setValue({
                  'title' : this.post.title,
                  'content' : this.post.content
                });
              });
      } else{
          this.mode = 'create';
          this.postId = null;
      }
    })
  }

  onImageUpload(event : Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image : file});
    this.form.get('image').updateValueAndValidity();
    console.log(file);
    console.log(this.form);
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addSavePostClick(){
    if(this.form.invalid){
      return ;
    }
    console.log('inside addSave');
    if(this.mode === 'create'){
      this.isLoading = true;
      console.log(this.form.value.title + ' ' + this.form.value.content);
       this.postService.addPost(this.form.value.title, this.form.value.content);
    } else{
      console.log(this.form.value.title + ' ' + this.form.value.content + 'edit');
       this.postService.updatePost(this.postId, this.form.value.title, this.form.value.content);
    }
    this.form.reset();
  }
}
