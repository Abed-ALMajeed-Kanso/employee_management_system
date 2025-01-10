import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private url = 'http://localhost:5200'; 
  private employees$ = new BehaviorSubject<Employee[]>([]);

  constructor(private httpClient: HttpClient) {}

  private refreshEmployees(): void {
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.next(employees);
      });
  }

  getEmployees(): Observable<Employee[]> {
    this.refreshEmployees();
    return this.employees$.asObservable();
  }

  getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`);
  }

  createEmployee(employee: Employee): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/employees`, employee, { responseType: 'text' as 'json' });
  }

  updateEmployee(id: string, employee: Employee): Observable<string> {
    return this.httpClient.put<string>(`${this.url}/employees/${id}`, employee, { responseType: 'text' as 'json' });
  }

  deleteEmployee(id: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/employees/${id}`, { responseType: 'text' as 'json' });
  }
}
