import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Modelo/login';
import { LoginService } from '../../servicios/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  hide = true;
  login:Login;


  responsedata: any;

  constructor(private http: HttpClient, private LoginService:LoginService, private router: Router) {}

  ngOnInit(): void {
    this.login=new Login();
  }

  onLogin(){
    this.LoginService.post(this.login).subscribe(result=>
      {
        if(result!=null){
          this.responsedata = result;
          localStorage.setItem('token', this.responsedata.token);
          this.router.navigateByUrl('/home');
        }
      }
    );
  }

}
