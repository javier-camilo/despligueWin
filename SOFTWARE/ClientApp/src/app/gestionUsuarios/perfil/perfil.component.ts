import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Register } from 'src/app/Modelo/register';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  datosUsuario: Register;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.datosUsuario = new Register();
    this.datosUsuario = this.loginService.GetInformacionUsuario();
  }

}
