import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  employee: BehaviorSubject<Employee> = new BehaviorSubject<Employee>({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('No id provided');
      return;
    }

    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employee.next(employee);
      },
      error: (err) => {
        console.error('Error fetching employee:', err);
      }
    });
  }

  editEmployee(employee: Employee): void {
    const employeeId = this.employee.value._id || '';
    
    if (!employeeId) {
      alert('Employee ID is missing.');
      return;
    }
  
    this.employeeService.updateEmployee(employeeId, employee).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        alert('Failed to update employee');
        console.error(error);
      }
    });
  }

}
