import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
Register() {
  this.router.navigateByUrl('/register');
}
 

  email: string ="";
  password: string ="";


  constructor(private router: Router,private http: HttpClient,private authService: AuthService) {}
 


  Login() {
    console.log(this.email);
    console.log(this.password);
 
    let bodyData = {
      email: this.email,
      password: this.password,
    };
 
        this.http.post("http://localhost:8080/api/v1/login", bodyData).subscribe(  (resultData: any) => {
        console.log(resultData);
 
        if (resultData.message == "Email not exits")
        {
      
          alert("Email not exits");
    
 
        }
        else if(resultData.message == "Login successful")
    
         {
          this.authService.login();
          this.router.navigateByUrl('/employees');
        }
        else
        {
          alert("Incorrect Email and Password not match");
        }

      },
      (error: any) => {
        if (error.status === 500) {
          alert("Incorrect Email and Password");
        } else {
          console.error(error);
          alert("An error occurred during LOGIN");
        }
      }
      
  );
  }
}