import { Component } from '@angular/core';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class listPostComponent{

  posts=[
    {title: "First Post", content: "Hello guyss.. This is Joy"},
    {title: "Second Post", content: "I work in TCS. is there anybody workingig in TCS??"}
  ];
  //posts = [];
}
