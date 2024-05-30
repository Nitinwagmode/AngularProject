import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id!: number;
  employee: Employee = new Employee();
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
    }, error => console.log(error));
  }

  onSubmit(employeeForm: NgForm) {
    // Validate form values
    if (!this.validateForm(employeeForm)) {
      // If form validation fails, return early
      return;
    }

    // Call the updateEmployee function
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      data => {
        this.goToEmployeeList();
      },
      error => {
        console.log(error); // Log the error for debugging purposes
        // Optionally, you can provide feedback to the user about the error
        // For example, you can display a message using a toast notification library or set an error flag to display an error message in the template
      }
    );
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
    //Validate phone number
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

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }
}
