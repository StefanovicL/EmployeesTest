import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees: { Name: string, HoursWorked: number }[] = []; 

  constructor() {}

  ngOnInit(): void {}
}