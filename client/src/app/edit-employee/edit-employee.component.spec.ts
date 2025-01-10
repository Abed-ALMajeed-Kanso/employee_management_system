import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEmployeeComponent } from './edit-employee.component';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';

describe('EditEmployeeComponent', () => {
  let component: EditEmployeeComponent;
  let fixture: ComponentFixture<EditEmployeeComponent>;
  let employeeService: EmployeeService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmployeeComponent ],
      imports: [ EmployeeFormComponent, CommonModule ],
      providers: [
        { provide: EmployeeService, useValue: { getEmployee: () => of({}), updateEmployee: () => of({}) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy() } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    });

    fixture = TestBed.createComponent(EditEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employee data on init', () => {
    spyOn(employeeService, 'getEmployee').and.returnValue(of({}));
    component.ngOnInit();
    expect(employeeService.getEmployee).toHaveBeenCalledWith('1');
  });

  it('should navigate to employees after editing employee', () => {
    const employee = { name: 'John Doe', position: 'Developer' };
    component.editEmployee(employee);
    expect(router.navigate).toHaveBeenCalledWith(['/employees']);
  });
});
