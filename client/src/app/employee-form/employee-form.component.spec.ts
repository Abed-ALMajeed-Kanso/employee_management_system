import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { EmployeeService } from '../employee.service';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeService: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFormComponent ],
      imports: [ ReactiveFormsModule, CommonModule ],
      providers: [ EmployeeService ]
    });

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit form values on value change', () => {
    spyOn(component.formValuesChanged, 'emit');
    component.employeeForm.setValue({ name: 'John', position: 'Developer', level: 'mid' });
    expect(component.formValuesChanged.emit).toHaveBeenCalledWith({ name: 'John', position: 'Developer', level: 'mid' });
  });

  it('should emit form data on submit', () => {
    spyOn(component.formSubmitted, 'emit');
    component.employeeForm.setValue({ name: 'John', position: 'Developer', level: 'mid' });
    component.submitForm();
    expect(component.formSubmitted.emit).toHaveBeenCalledWith({ name: 'John', position: 'Developer', level: 'mid' });
  });
});
