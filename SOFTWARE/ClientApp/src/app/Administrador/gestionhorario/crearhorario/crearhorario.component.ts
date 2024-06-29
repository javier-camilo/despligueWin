import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HandleHttpErrorService } from 'src/app/@base/handle-http-error-service.service';
import { HorarioInputModel, Tiempo } from 'src/app/Modelo/tiempo';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { TiempoService } from 'src/app/servicios/tiempo.service';

@Component({
  selector: 'app-crearhorario',
  templateUrl: './crearhorario.component.html',
  styleUrls: ['./crearhorario.component.css']
})
export class CrearhorarioComponent implements OnInit {

  protected minDate: Date;
  protected horarioInputModel: HorarioInputModel;
  protected isLinear = true;

  constructor(private _formBuilder: FormBuilder, private error: HandleHttpErrorService,
    private tiempoService: TiempoService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.caragandoDatos();
  }

  firstFormGroup = this._formBuilder.group({
    fechaInicio: [null, Validators.required],
    fechaFin: [null, Validators.required],
    intervaloAtencion: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
    numeroMaximoTurnos: [null, [Validators.required, Validators.pattern('^[0-9]+$')]]
  });



  caragandoDatos() {
    this.horarioInputModel = new HorarioInputModel();
    this.minDate = new Date();
  }

  registrarDatos() {

    this.firstFormGroup.markAllAsTouched();

    if (this.firstFormGroup.invalid)
      return this.error.log("debe verificar los campos");

    let dialogo = this.dialog.open(DialogoConfirmacionComponent, { data: { name: "Advertencia", descripcion: "¿esta seguro de realizar esta accion?" } });

    dialogo.afterClosed().subscribe(result => {
      if (result == "true") {
        console.log('Datos a enviar:', this.horarioInputModel);
        this.cargarDatosHorario();
        this.tiempoService.post(this.horarioInputModel).subscribe();
      }
    }
    );

  }

  cargarDatosHorario() {

      this.horarioInputModel = {
        fechaInicio: this.firstFormGroup.controls['fechaInicio'].value,
        fechaFin: this.firstFormGroup.controls['fechaFin'].value,
        intervaloAtencion: this.firstFormGroup.controls['intervaloAtencion'].value,
        numeroMaximoTurnos: this.firstFormGroup.controls['numeroMaximoTurnos'].value
      };
    this.horarioInputModel.numeroMaximoTurnos = this.firstFormGroup.controls["numeroMaximoTurnos"].value;
    this.horarioInputModel.intervaloAtencion = this.firstFormGroup.controls["intervaloAtencion"].value;
  }

  limpiar() {
    this.firstFormGroup.setErrors(null);
    this.firstFormGroup.clearValidators();
    this.firstFormGroup.reset();
  }


}
