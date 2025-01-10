import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent, 
    EmployeesListComponent,
    AddEmployeeComponent, 
    EditEmployeeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()) 
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
