import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { EmployeesService } from './employees.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  employees: any; 

  constructor(private employeesService: EmployeesService) {}

  calculateHoursWorked(startTime: Date, endTime: Date): number {
    
    const start = new Date(startTime + 'Z').getTime();
    const end = new Date(endTime + 'Z').getTime();
    const diff = end - start;

    return Math.round(diff / (1000 * 60 * 60));
  }
  
  ngOnInit() {
    this.employeesService.getData()    
    .pipe(
      map((data: any) => {  
      const employeeHours: { [name: string]: number } = {};
      // Calculating total worked hours for employee
        data.forEach((employee: any) => {

        const hoursWorked = this.calculateHoursWorked(employee.StarTimeUtc, employee.EndTimeUtc);
            
          if (employeeHours[employee.EmployeeName]) {
            employeeHours[employee.EmployeeName] += hoursWorked;
          } else {
            employeeHours[employee.EmployeeName] = hoursWorked;
          }

        });
        return Object.entries(employeeHours).map(([name, hours]) => ({ Name: name, HoursWorked: hours }));
      })) // Get the data
      .subscribe((employees: { Name: string, HoursWorked: number }[]) => {

        this.employees = employees.sort((a, b) => b.HoursWorked - a.HoursWorked); // Descending sort
        this.employees = this.employees.filter((item: any) => item.Name !== "null"); // Remove null value
      })
  }
}
