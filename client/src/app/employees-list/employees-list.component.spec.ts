import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import { EmployeeService } from '../employee.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Employee } from '../employee';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let employeeService: EmployeeService;

  const mockEmployees: Employee[] = [
    { _id: '1', name: 'John Doe', position: 'Developer', level: 'mid' },
    { _id: '2', name: 'Jane Smith', position: 'Manager', level: 'senior' }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesListComponent ],
      imports: [ CommonModule, RouterModule ],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getEmployees: jasmine.createSpy('getEmployees').and.returnValue(of(mockEmployees)),
            deleteEmployee: jasmine.createSpy('deleteEmployee').and.returnValue(of({}))
          }
        }
      ]
    });

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on init', () => {
    component.ngOnInit();
    expect(employeeService.getEmployees).toHaveBeenCalled();
    expect(component.employees$).toBeTruthy();
  });

  it('should delete employee and refresh list', () => {
    spyOn(component, 'fetchEmployees');
    component.deleteEmployee('1');
    expect(employeeService.deleteEmployee).toHaveBeenCalledWith('1');
    expect(component.fetchEmployees).toHaveBeenCalled();
  });

  it('should display employee list', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockEmployees.length);
    expect(rows[0].cells[0].textContent).toBe(mockEmployees[0].name);
    expect(rows[1].cells[0].textContent).toBe(mockEmployees[1].name);
  });
});
