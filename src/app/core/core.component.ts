import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-core',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: ['']
})
export class CoreComponent implements OnInit, OnDestroy {
  // constructor() {}

  ngOnInit(): void {
    // console.log('CoreComponent onInit');
  }

  ngOnDestroy(): void {
    // console.log('CoreComponent onDestroy');
  }
}
