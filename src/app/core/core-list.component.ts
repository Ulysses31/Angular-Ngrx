import {
  AfterViewInit,
  Directive,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, pipe, tap } from 'rxjs';
import { CoreService } from './core-service';

@Directive()
export abstract class CoreListComponent<T>
  implements OnInit, AfterViewInit, OnDestroy
{
  columnDefs: string[] = [];

  abstract handleDelete(id: number): void;

  constructor(
    public service: CoreService<T>,
    public route: ActivatedRoute,
    public router: Router
  ) {
    console.log('[OnInit CoreListComponent]');
  }

  ngOnInit(): void {
    console.log('CoreListComponent onInit');
  }

  ngAfterViewInit(): void {
    console.log('CoreListComponent onAfterViewInit');
  }

  ngOnDestroy(): void {
    console.log('CoreListComponent onDestroy');
  }

  getAll(): Observable<T[]> {
    return this.service.getAll().pipe(
      tap(
        (dto) =>
          (this.columnDefs = Object.getOwnPropertyNames(dto[0]))
      ),
      map((dto) => {
        return dto;
      })
    );
  }

  handleNew(): void {
    this.redirectToModelForm(0);
  }

  handleEdit(id: number): void {
    this.redirectToModelForm(id);
  }

  private getCurrentRouteUrl(): string {
    const url: any = this.route.root.snapshot;
    return url._routerState.url;
  }

  private redirectToModelForm(id: number): void {
    const currUrl = this.getCurrentRouteUrl();
    this.router.navigate([currUrl, id], {
      queryParams: { backUrl: this.router.url }
    });
  }
}
