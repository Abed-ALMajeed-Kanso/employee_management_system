import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmployeeComponent } from './add-employee.component';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

describe('AddEmployeeComponent', () => {
  let component: AddEmployeeComponent;
  let fixture: ComponentFixture<AddEmployeeComponent>;
  let employeeService: EmployeeService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmployeeComponent ],
      imports: [ EmployeeFormComponent ],
      providers: [
        { provide: EmployeeService, useValue: { createEmployee: () => of({}) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } }
      ]
    });

    fixture = TestBed.createComponent(AddEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to employees after adding an employee', () => {
    const employee = { name: 'John Doe', position: 'Developer' };
    component.addEmployee(employee);
    expect(router.navigate).toHaveBeenCalledWith(['/employees']);
  });
});
