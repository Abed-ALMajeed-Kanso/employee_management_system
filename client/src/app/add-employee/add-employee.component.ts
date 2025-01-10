import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [EmployeeFormComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'] 
})
export class AddEmployeeComponent {

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  addEmployee(employee: Employee) {
    this.employeeService.createEmployee(employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        alert('Failed to create employee');
        console.error(error);
      }
    });
  }
}
