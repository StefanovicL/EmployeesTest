import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';  
import ChartDataLabels from 'chartjs-plugin-datalabels';
import 'chartjs-plugin-datalabels';
Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  
  @Input() employees: { Name: string, HoursWorked: number }[] = [];
  
  ctx: any;
  config: any;
  labels: string[] = [];
  data: number[] = [];
  
  constructor() { }
  
  ngOnInit(): void {  
    
    const totalHours: number = this.employees.reduce(
      (total: number, employee: any) => total + employee.HoursWorked, 0); // Sum hours
      
    this.data = this.employees.map(
      (employee: any) => (employee.HoursWorked / totalHours) * 100);  // Get percentages
        
    this.labels = this.employees.map((employee: any) => employee.Name); // Get names
        
    this.ctx = document.getElementById('myChart');
        
    this.config = {
      type : 'pie',
      data : {
        labels : this.labels,
        datasets : [{
          label : 'Chart Data',
          data : this.data,
          borderWidth: 0,
          backgroundColor: [
            'green', 
            'blue',
            'pink',
            'orange',
            'purple', 
            'brown', 
            'darkgreen', 
            'red', 
            'yellow', 
            'lightblue'
          ],
        }],
      },
      options : {
        responsive: true,
        maintainAspectRatio: true,
        plugins : {
          textAlign : 'right',
          datalabels : {
            color: ['white', 'black'],
            formatter: (value:any, ctx:any) => { 
              return value.toFixed(2) + '%';
            },
          },
          legend : {
            position : 'bottom'
          } 
        },
      },
    plugins : [ChartDataLabels]
    }
    const myChart = new Chart(this.ctx, this.config);
  } 
} 