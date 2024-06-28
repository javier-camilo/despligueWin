import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Motivo } from 'src/app/Modelo/motivo';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { Register, UserVista } from 'src/app/Modelo/register';
import { LoginService } from 'src/app/servicios/login.service';
import { MotivoService } from 'src/app/servicios/motivo.service';
import { PoblacionServiceService } from 'src/app/servicios/poblacion-service.service';
import { Turno } from '../../Modelo/turno';
import { MatDialog } from '@angular/material/dialog';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error-service.service';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { TurnoService } from 'src/app/servicios/turno.service';
import { TiempoService } from 'src/app/servicios/tiempo.service';
import { Tiempo } from 'src/app/Modelo/tiempo';

@Component({
  selector: 'app-citas-ventanilla',
  templateUrl: './citas-ventanilla.component.html',
  styleUrls: ['./citas-ventanilla.component.css']
})
export class CitasVentanillaComponent implements OnInit {


  protected usuario: UserVista;
  protected turno: Turno;
  protected motivos: Motivo[];
  protected poblaciones: Poblacion[];
  protected descripcionMotivo: string;


  protected isLinear = true;
  protected encontrado: boolean;
  protected hide = true;

  protected selectedDate: Date | null = null;
  protected minDate: Date;
  protected listadoHorario: Tiempo[];
  protected filteredHorarios: Tiempo[] = [];


  firstFormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    identificacion: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    motivo: ['', Validators.required],
    poblacion: ['', Validators.required],
    selectedDate: [null, Validators.required],
    horario: ['', Validators.required]
  });


  constructor(private loginService: LoginService, private _formBuilder: FormBuilder, private motivoService: MotivoService,
    private poblacionService: PoblacionServiceService, private dialog: MatDialog, private error: HandleHttpErrorService,
              private turnoService: TurnoService, private tiempoService:TiempoService) { }

  ngOnInit(): void {

    this.cargarDatos();

  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.filterAndSortHorarios(this.selectedDate);
  }

  filterAndSortHorarios(selectedDate: Date | null) {

    if (this.selectedDate) {
      const selectedDay = this.selectedDate.getDate();
      const selectedMonth = this.selectedDate.getMonth();
      const selectedYear = this.selectedDate.getFullYear();

      this.filteredHorarios = this.listadoHorario.filter(horario => {
        const horarioDate = new Date(horario.horaInicio);
        return horarioDate.getDate() === selectedDay &&
              horarioDate.getMonth() === selectedMonth &&
              horarioDate.getFullYear() === selectedYear;
      });

      this.filteredHorarios.sort((a, b) => {
        return a.horaInicio.getTime() - b.horaInicio.getTime();
      });
    }
  }

  cargarHorario() {
    var referencia = this.firstFormGroup.controls["horario"].value;
    this.listadoHorario.forEach(element => {

      if (element.refHorario == referencia) {
        this.turno.tiempo = element;
      }

    });
  }


  confirmar() {

    this.firstFormGroup.markAllAsTouched();

    if (this.firstFormGroup.invalid)
      return this.error.log("debe verificar los campos");

    let dialogo = this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Advertencia", descripcion: "¿esta seguro de realizar esta accion?" } });

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        if (this.encontrado == false) {
          this.guardarTurnoUsuario();
        } else {
          this.guardarTurno();
        }
      }
    }
    );
  }


  guardarTurno() {
    this.cargarDatosTurno();
    this.turnoService.post(this.turno).subscribe();
    this.limpiar();
  }

  guardarTurnoUsuario() {

    this.obtenerDatosUsuario();
    this.loginService.registrar(this.usuario," ").subscribe(result => {
      if (result != null) {
        this.guardarTurno();
        this.limpiar();
      }
    });
  }

  limpiar() {
    this.usuario = new UserVista();
    this.usuario.userName = "";
    this.usuario.apellido = "";
    this.usuario.email = "";
    this.usuario.identificacion = "";
    this.usuario.nombre = "";
    this.usuario.phoneNumber = "";
    this.usuario.password = "";
    this.encontrado = false;
    this.firstFormGroup.setErrors(null);
    this.firstFormGroup.clearValidators();
    this.firstFormGroup.reset();
  }

  obtenerDatosUsuario() {
    this.usuario.identificacion = this.firstFormGroup.controls["identificacion"].value;
    this.usuario.userName = this.firstFormGroup.controls["userName"].value;
    this.usuario.apellido = this.firstFormGroup.controls["apellido"].value;
    this.usuario.email = this.firstFormGroup.controls["email"].value;
    this.usuario.nombre = this.firstFormGroup.controls["nombre"].value;
    this.usuario.password = this.firstFormGroup.controls["password"].value;
    this.usuario.telefono = this.firstFormGroup.controls["phoneNumber"].value;
  }



  cargarDatos() {
    this.usuario = new UserVista();
    this.turno = new Turno();
    this.encontrado = false;
    this.motivoService.get("").subscribe(result => this.motivos = result);
    this.poblacionService.get("").subscribe(result => this.poblaciones = result);
    this.tiempoService.getTiempo("").subscribe(_ => this.listadoHorario = _);
    this.minDate = new Date();
  }


  buscar() {

    if (this.firstFormGroup.controls["identificacion"].invalid) {
        return this.error.log("debe digitar la identificación, para consultar al usuario");
    }

    var identificacion = this.firstFormGroup.controls["identificacion"].value;

    this.loginService.getUserID(identificacion, "").subscribe(result => {
        if (result != null) {
          this.encontrado = true;
          this.cargarDatosUsuario(result);
        }
      }
    )



  }


  cargarDescripcion(descripcion: string) {
    this.descripcionMotivo = descripcion;
  }

  cargarDatosTurno() {
    this.turno.fechaFinalizacion = "";
    this.turno.descripcionOperacion = this.descripcionMotivo;
    this.turno.contratistaAtendio = "";
    this.turno.refTiempo = "";
    this.turno.asistencia = "";
    this.turno.observacion= "";
    this.turno.motivo = this.firstFormGroup.controls["motivo"].value;
    this.turno.poblacion = this.firstFormGroup.controls["poblacion"].value;
    this.turno.refSolicitante = this.usuario.identificacion;
    this.cargarHorario();
  }

  cargarDatosUsuario(usuarioDto: UserVista) {
    this.usuario = usuarioDto;
    this.firstFormGroup.patchValue(this.usuario);
    this.firstFormGroup.controls["password"].patchValue("******");
  }



}
