import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error-service.service';
import { Register, UserVista } from 'src/app/Modelo/register';
import { Turno } from 'src/app/Modelo/turno';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { LoginService } from 'src/app/servicios/login.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  datosUsuario: UserVista;
  datosUsuarioDos: UserVista;
  turno: Turno;
  message: string;
  turnoAtendido: Boolean;

  constructor(private rutaActiva: ActivatedRoute, private turnoServicio: TurnoService,
    private loginService: LoginService, private _formBuilder: FormBuilder,
      private error:HandleHttpErrorService,private dialog:MatDialog, private router: Router) { }


  ngOnInit(): void {
    this.turnoAtendido = false;
    this.consultarTurno();
  }



  consultarTurno() {

    this.turno = new Turno();

    const id = this.rutaActiva.snapshot.params.codigoHistorico;

    this.turnoServicio.getId(id,"").subscribe(resul => {

      this.turno = resul;

      this.turno != null ? this.incializarUsario() : this.inicializarError();

    });

  }


  incializarUsario() {


    this.datosUsuario = new UserVista();

    this.loginService.getUserID(this.turno.refSolicitante).subscribe(resul => {

      this.datosUsuario=resul;

      this.datosUsuario != null ? null : this.errorUsuario();

    });


    this.datosUsuarioDos = new UserVista();

    this.loginService.getUserID(this.turno.contratistaAtendio).subscribe(resul => {

      this.datosUsuarioDos=resul;

      this.datosUsuarioDos != null ? null : this.errorUsuarioDos();

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
    
    this.errorUsuario();
    this.errorUsuarioDos();


  }

  errorUsuario() {

    this.datosUsuario = new UserVista();

    this.datosUsuario.userName = "..";
    this.datosUsuario.apellido = "..";
    this.datosUsuario.identificacion = "..";
    this.datosUsuario.nombre = "..";
    this.datosUsuario.password = "..";
    this.datosUsuario.phoneNumber = "..";
    this.datosUsuario.telefono = "..";

  }


  errorUsuarioDos() {

    this.datosUsuarioDos = new UserVista();

    this.datosUsuarioDos.userName = "..";
    this.datosUsuarioDos.apellido = "..";
    this.datosUsuarioDos.identificacion = "..";
    this.datosUsuarioDos.nombre = "..";
    this.datosUsuarioDos.password = "..";
    this.datosUsuarioDos.phoneNumber = "..";
    this.datosUsuarioDos.telefono = "..";

  }




}
