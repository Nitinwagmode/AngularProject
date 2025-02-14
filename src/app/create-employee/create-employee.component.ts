import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit(): void {
  }

  saveEmployee(){
    this.employeeService.createEmployee(this.employee).subscribe( data =>{
      console.log(data);
      this.goToEmployeeList();
    },
    error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees']);
  }

  onSubmit(employeeForm: NgForm){

    if (!this.validateForm(employeeForm)) {
      return;
    }

    console.log(this.employee);
    this.saveEmployee();
  }



  validateForm(employeeForm: NgForm): boolean {
    // Validate First Name
    if (!this.employee.firstName || !/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(this.employee.firstName.trim())) {
      console.log('First Name is invalid');
      // Optionally, provide feedback to the user about the validation error
      return false;
    }

    // Validate Last Name
    if (!this.employee.lastName || !/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(this.employee.lastName.trim())) {
      console.log('Last Name is invalid');
      // Optionally, provide feedback to the user about the validation error
      return false;
    }

    // Validate Email
    if (!this.employee.emailId || !this.isValidEmail(this.employee.emailId)) {
      console.log('Email is invalid');
      // Optionally, provide feedback to the user about the validation error
      return false;
    }

    // Validate position
    if (!this.employee.position || !/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(this.employee.position.trim())) {
      console.log('Position is invalid');
      // Optionally, provide feedback to the user about the validation error
      return false;
    }

    // Validate phone number
    if (!this.employee.phoneNo || !/^[0-9]{10}$/.test(String(this.employee.phoneNo).trim())) {
      console.log('Mobile Number is invalid');
      // Optionally, provide feedback to the user about the validation error
      return false;
  }

    // All validations passed
    return true;
  }

  isValidEmail(email: string): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


}
