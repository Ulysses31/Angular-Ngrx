import { NgModule } from '@angular/core';
import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentsFormComponent } from './comments-form/comments-form.component';

@NgModule({
  declarations: [CommentsComponent, CommentsFormComponent],
  imports: [SharedModule, CommentsRoutingModule]
})
export class CommentsModule {}
