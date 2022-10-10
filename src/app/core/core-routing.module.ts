import { CoreComponent } from './core.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      {
        path: 'posts',
        loadChildren: () =>
          import('../features/posts/posts.module').then(
            (m) => m.PostsModule
          )
      },
      {
        path: 'comments',
        loadChildren: () =>
          import('../features/comments/comments.module').then(
            (m) => m.CommentsModule
          )
      },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
