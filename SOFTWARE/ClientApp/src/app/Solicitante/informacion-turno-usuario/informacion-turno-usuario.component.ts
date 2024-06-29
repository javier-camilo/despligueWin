import { Component, OnInit } from '@angular/core';
import { Register, UserVista } from 'src/app/Modelo/register';
import { Tiempo } from 'src/app/Modelo/tiempo';
import { Turno } from 'src/app/Modelo/turno';
import { LoginService } from 'src/app/servicios/login.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-informacion-turno-usuario',
  templateUrl: './informacion-turno-usuario.component.html',
  styleUrls: ['./informacion-turno-usuario.component.css']
})
export class InformacionTurnoUsuarioComponent implements OnInit {

  datosUsuario: Register;
  turno: Turno;

  constructor(private turnoServicio: TurnoService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.incializarUsario();
    this.inicializarTurno();
  }

  incializarUsario() {

    this.datosUsuario = new UserVista();
    this.datosUsuario = this.loginService.GetInformacionUsuario();

  }

  inicializarTurno() {


    this.turno = new Turno();

    this.turnoServicio.getTurnoUsuario(this.datosUsuario.identificacion).subscribe(resul => {

      this.turno = resul;

      this.turno != null ? null : this.inicializarError();

    });
  }

  inicializarError() {

    this.turno = new Turno();
    this.turno.asistencia = "..";
    this.turno.contratistaAtendio = "..";
    this.turno.descripcionOperacion = "..";
    this.turno.fechaFinalizacion = "..";
    this.turno.motivo = "..";
    this.turno.numero = 0;
    this.turno.observacion = "..";
    this.turno.poblacion = "..";
    this.turno.refSolicitante = "..";
    this.turno.refTiempo = "..";
    this.turno.tiempo=new Tiempo();
  }


}
