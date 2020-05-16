import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listPostComponent } from './posts/list-post/list-post.component';
import { createPostComponent } from './posts/create-post/create-post.component';


const routes: Routes = [
  {path: '', component: listPostComponent},
  {path: 'create', component: createPostComponent},
  {path: 'edit/:postId', component: createPostComponent}
]

@NgModule({

  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}
