import { CoreComponent } from './core.component';
import { CoreRoutingModule } from './core-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@NgModule({
  declarations: [CoreComponent, NavbarComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreRoutingModule
  ],
  exports: []
})
export class CoreModule {}
