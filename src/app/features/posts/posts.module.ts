import { NgModule } from '@angular/core';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsFormComponent } from './posts-form/posts-form.component';

@NgModule({
  declarations: [PostsComponent, PostsFormComponent],
  imports: [SharedModule, PostsRoutingModule]
})
export class PostsModule {}
