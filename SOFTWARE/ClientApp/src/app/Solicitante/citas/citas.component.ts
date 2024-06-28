import { OnInit } from '@angular/core';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../../dialogo-confirmacion/dialogo-confirmacion.component';
import { MotivoService } from '../../servicios/motivo.service';
import { LoginService } from '../../servicios/login.service';
import { PoblacionServiceService } from '../../servicios/poblacion-service.service';
import { Motivo } from 'src/app/Modelo/motivo';
import { Poblacion } from 'src/app/Modelo/poblacion';
import { Register } from '../../Modelo/register';
import { TurnoService } from 'src/app/servicios/turno.service';
import { Turno } from 'src/app/Modelo/turno';
import { TiempoService } from 'src/app/servicios/tiempo.service';
import { Tiempo } from 'src/app/Modelo/tiempo';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {

  protected selectedDate: Date | null = null;
  protected minDate: Date;
  protected listadoHorario: Tiempo[];
  protected filteredHorarios: Tiempo[] = [];
  protected motivos: Motivo[];
  protected poblaciones: Poblacion[];
  protected usuario: Register;
  protected turno: Turno;

  desripcionMotivo:string | null;

  constructor(public dialogo: MatDialog, private _formBuilder: FormBuilder,private tiempoService:TiempoService,
    private motivoService: MotivoService, private loginservice: LoginService,
    private poblacionService:PoblacionServiceService, private turnoService: TurnoService) { }

  ngOnInit(): void {
    this.caragandoDatos();
  }

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.filterAndSortHorarios(this.selectedDate);
  }

  caragandoDatos() {
    this.turno = new Turno();
    this.desripcionMotivo = "";
    this.motivos = [];
    this.poblaciones = [];
    this.usuario = this.loginservice.GetInformacionUsuario();
    this.motivoService.get("").subscribe(result => this.motivos = result);
    this.poblacionService.get("").subscribe(result => this.poblaciones = result);
    this.tiempoService.getTiempo("").subscribe(_ => this.listadoHorario = _);
    this.minDate = new Date();
  }

  cargarDescripcion(descripcion: string) {
    this.desripcionMotivo = descripcion;
  }

  firstFormGroup = this._formBuilder.group({
    motivo: ['', Validators.required],
    poblacion: ['', Validators.required],
    selectedDate: [null, Validators.required],
    horario: ['', Validators.required]
  });


  registrar() {
    let dialogo= this.dialogo.open(DialogoConfirmacionComponent, {data:{name:"Advertencia", descripcion:"¿esta seguro de realizar esta accion?"} } );

    dialogo.afterClosed().subscribe(result => {
      if (result) {
        this.cargarDatos();
        this.turnoService.post(this.turno).subscribe();
      }
    });
  }

  cargarDatos() {
    this.turno.fechaFinalizacion = "";
    this.turno.descripcionOperacion = this.desripcionMotivo;
    this.turno.contratistaAtendio = "";
    this.turno.refTiempo = "";
    this.turno.asistencia = "";
    this.turno.observacion= "";
    this.turno.motivo = this.firstFormGroup.controls["motivo"].value;
    this.turno.poblacion = this.firstFormGroup.controls["poblacion"].value;
    this.turno.refSolicitante = this.usuario.identificacion;
    this.cargarHorario();
  }

  cargarHorario() {
    var referencia = this.firstFormGroup.controls["horario"].value;
    this.listadoHorario.forEach(element => {

      if (element.refHorario == referencia) {
        this.turno.tiempo = element;
      }

    });
  }

  isLinear = true;

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

}
