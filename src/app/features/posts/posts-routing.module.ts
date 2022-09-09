import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsFormComponent } from './posts-form/posts-form.component';
import { PostsComponent } from './posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: ':id', component: PostsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}
