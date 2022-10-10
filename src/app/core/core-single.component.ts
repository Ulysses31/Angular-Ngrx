import {
  AfterViewInit,
  Directive,
  OnDestroy,
  OnInit
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from '../features/posts/state/posts.reducer';
import { CoreService } from './core-service';

@Directive()
export abstract class CoreSingleComponent<T>
  implements OnInit, AfterViewInit, OnDestroy
{
  abstract newModel(): void;
  abstract editModel(dto: T): void;
  abstract updateModel(dto: T): void;
  abstract insertModel(dto: T): void;

  constructor(
    public store: Store<State>,
    public service: CoreService<T>,
    public route: ActivatedRoute,
    public router: Router
  ) {
    console.log('[OnInit CoreSingleComponent]');
    this.getModel();
  }

  ngOnInit(): void {
    console.log('CoreSingleComponent onInit');
  }

  ngAfterViewInit(): void {
    console.log('CoreSingleComponent onAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('CoreSingleComponent onDestroy');
  }

  getById(id: number): Observable<T> {
    return this.service.getById(id);
  }

  handleFormStatus(e: NgForm): void {
    console.log(e);
  }

  handleReset(): void {
    this.getModel();
  }

  handleBack(): void {
    this.route.queryParams.subscribe((data) =>
      this.router.navigateByUrl(data['backUrl'])
    );
  }

  handleSubmit(e: NgForm): void {
    console.log(e.value);
    if (e.value.id === 0) {
      this.service.insert(e.value).subscribe((data) => {
        if (data) {
          this.insertModel(data);
        }
      });
    } else {
      this.service.update(e.value.id, e.value).subscribe((data) => {
        if (data) {
          this.updateModel(data);
        }
      });
    }
  }

  getModel(): void {
    this.route.params.subscribe((data: any) => {
      const id = data['id'];
      if (id > 0) {
        this.service.getById(id).subscribe((dto: T) => {
          if (dto) {
            this.editModel(dto);
          }
        });
      } else {
        this.newModel();
      }
    });
  }
}
