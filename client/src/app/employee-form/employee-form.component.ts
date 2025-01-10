import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  @Input() initialState: BehaviorSubject<Employee> = new BehaviorSubject({});
  @Output() formValuesChanged = new EventEmitter<Employee>();
  @Output() formSubmitted = new EventEmitter<Employee>();

  employeeForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  get name() {
    return this.employeeForm.get('name')!;
  }

  get position() {
    return this.employeeForm.get('position')!;
  }

  get level() {
    return this.employeeForm.get('level')!;
  }

  ngOnInit(): void {
    this.initialState.subscribe((employee) => {
      this.employeeForm = this.fb.group({
        name: [employee.name, [Validators.required, Validators.minLength(3)]],
        position: [employee.position, [Validators.required, Validators.minLength(5)]],
        level: [employee.level, [Validators.required]],
      });

      this.employeeForm.valueChanges.subscribe((val) => {
        this.formValuesChanged.emit(val);
      });
    });
  }

  submitForm(): void {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value);
    }
  }

}
