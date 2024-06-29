import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from '../../Modelo/turno';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { Register, UserVista } from 'src/app/Modelo/register';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { FormBuilder, Validators } from '@angular/forms';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error-service.service';
import { Tiempo } from 'src/app/Modelo/tiempo';

@Component({
  selector: 'app-registrar-atencion',
  templateUrl: './registrar-atencion.component.html',
  styleUrls: ['./registrar-atencion.component.css']
})
export class RegistrarAtencionComponent implements OnInit {


  datosContratista: Register;
  datosUsuario: UserVista;
  turno: Turno;
  message: string;
  turnoAtendido: Boolean;

  constructor(private rutaActiva: ActivatedRoute, private turnoServicio: TurnoService,
    private loginService: LoginService, private _formBuilder: FormBuilder,
      private error:HandleHttpErrorService,private dialog:MatDialog, private router: Router) { }


  firstFormGroup = this._formBuilder.group({
    asistencia: ['', Validators.required],
    observacion: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {

    if (this.firstFormGroup.invalid) {
        return this.error.log("Hubo errores al digitar los datos");
    }

     this.turno.contratistaAtendio = this.datosContratista.identificacion;
     this.turno.asistencia=this.firstFormGroup.controls["asistencia"].value;
     this.turno.observacion = this.firstFormGroup.controls["observacion"].value;

     this.confirmar();


   }



  confirmar() {
    let dialogo = this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Advertencia", descripcion: "¿esta seguro de realizar esta accion?" } });

    dialogo.afterClosed().subscribe(result => {
      if (this.turnoAtendido) {
        return this.error.log("el turno ya ha sido atendido");
      } else {
        this.update(result);
      }
    }
    );
  }


  update(result: any) {
    if(result=="true"){
      this.turnoServicio.put(this.turno).subscribe(result => {
         this.router.navigateByUrl('/colaAtencion');
      });
    }
  }


  ngOnInit(): void {
    this.turnoAtendido = false;
    this.inicializarContratista();
    this.consultarTurno();
  }


  inicializarContratista() {
    this.datosContratista = new Register();
    this.datosContratista = this.loginService.GetInformacionUsuario();
  }


  consultarTurno() {

    this.turno = new Turno();

    const id = this.rutaActiva.snapshot.params.codigoTurno;

    this.turnoServicio.getId(id).subscribe(resul => {

      this.turno = resul;

      this.turno != null ? this.incializarUsario() : this.inicializarError();

    });

  }


  incializarUsario() {

    if (this.turno.asistencia === "Atendido" || this.turno.asistencia === "No asistio") {
      this.turnoAtendido = true;
    }

    this.datosUsuario = new UserVista();

    this.loginService.getUserID(this.turno.refSolicitante).subscribe(resul => {

      this.datosUsuario=resul;

      this.datosUsuario != null ? null : this.errorUsuario();

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

    this.errorUsuario();


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



}
