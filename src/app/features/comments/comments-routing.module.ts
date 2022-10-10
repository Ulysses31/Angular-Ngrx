import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentsFormComponent } from './comments-form/comments-form.component';
import { CommentsComponent } from './comments.component';

const routes: Routes = [
  { path: '', component: CommentsComponent },
  { path: ':id', component: CommentsFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule {}
