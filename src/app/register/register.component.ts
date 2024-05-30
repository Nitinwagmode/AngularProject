import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string ="";
  password: string ="";

 
  constructor(private router: Router,private http: HttpClient )
  {

  }
  save()
  {
  
    let bodyData = {
      "email" : this.email,
      "password" : this.password
    };
      this.http.post("http://localhost:8080/api/v1/register", bodyData, { responseType: 'text' }).subscribe(
        (resultData: any) => {
          console.log(resultData);
          alert("Employee Registered Successfully");
          this.router.navigateByUrl('/login');
        },
        (error: any) => {
          if (error.status === 404) {
            alert("Email already exists");
          } else {
            console.error(error);
            alert("An error occurred during registration");
          }
        }
      );
  }
  login() {
    this.router.navigateByUrl('/login');
  }
}