import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  EditService,
  GridModule,
  PagerModule,
} from '@syncfusion/ej2-angular-grids';
import { InterceptorInterceptor } from './sharing/interceptor.interceptor';
import { AddprogramComponent } from './component/addprogram/addprogram.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './component/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [AppComponent, AddprogramComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    PagerModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
    EditService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
