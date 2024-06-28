import { Component, OnInit } from '@angular/core';
import { LegendPosition, Color, ScaleType } from '@swimlane/ngx-charts';
import { Register } from 'src/app/Modelo/register';
import { ReporteTurno } from 'src/app/Modelo/reporte';
import { LoginService } from 'src/app/servicios/login.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {


  datosUsuario: Register;
  single: ReporteTurno[];
  singleContratista: ReporteTurno[];


  //opciones del grafico
  view: [number, number] = [500, 400];
  viewCircle: [number, number] = [500, 400];


  //options
  showLegend: boolean = false;
  showLabels: boolean = true;

  //opciones de grafico de barras
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Asistencia';
  showYAxisLabel = true;
  yAxisLabel = 'Numero Atencion';

  //opciones del grafico circular
  isDoughnut: boolean = false;
  public legendPosition: LegendPosition = LegendPosition.Below;


  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };



  constructor(private loginService: LoginService, private turnoServicio:TurnoService) { }

  ngOnInit(): void {
    this.iniciarDatosUsuario();
    this.getReporte();
    this.getReporteContratista();
  }

  iniciarDatosUsuario() {

    this.datosUsuario = new Register();
    this.datosUsuario = this.loginService.GetInformacionUsuario();

  }


  getReporte() {

    this.turnoServicio.getReporte("").subscribe(result => {
      this.single = result;
      this.getReporteContratista();
    }
    );

  }


  getReporteContratista() {

    this.turnoServicio.getReporteContratista(this.datosUsuario.identificacion,"").subscribe(result => {
      this.singleContratista = result;
    }
    );

  }


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
