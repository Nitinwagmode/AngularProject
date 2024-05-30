import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment'; 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees!: Employee[];
  filteredEmployees!: Employee[];
  searchQuery: string = '';
  startDate: string = ''; 
  endDate: string = ''; 
  faEdit = faEdit;
  faTrash = faTrash;
  faEye = faEye;

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      console.log(data);
      this.getEmployees();
    });
  }

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredEmployees);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'employees');
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  filterEmployees(): void {
    const searchQueryLower = this.searchQuery.toLowerCase();
    const startDate = this.startDate ? moment(this.startDate) : null; 
    const endDate = this.endDate ? moment(this.endDate) : null; 

    this.filteredEmployees = this.employees.filter(employee => {
      const employeeDate = moment(employee.date, 'YYYY-MM-DD');

      const matchesQuery = employee.firstName.toLowerCase().includes(searchQueryLower) ||
                           employee.lastName.toLowerCase().includes(searchQueryLower) ||
                           employee.emailId.toLowerCase().includes(searchQueryLower) ||
                           employee.position.toLowerCase().includes(searchQueryLower) ||
                           employee.phoneNo.toLowerCase().includes(searchQueryLower) ||
                           employeeDate.format('YYYY-MM-DD').includes(searchQueryLower);

      const withinDateRange = (!startDate || employeeDate.isSameOrAfter(startDate)) &&
                              (!endDate || employeeDate.isSameOrBefore(endDate));

      return matchesQuery && withinDateRange;
    });
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
