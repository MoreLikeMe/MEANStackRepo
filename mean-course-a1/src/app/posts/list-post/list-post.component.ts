import { Component, Input } from '@angular/core';

import { Post } from '../post.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})

export class listPostComponent{

  @Input() posts: Post[]=[];
  //posts = [];
}
