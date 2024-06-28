import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ReporteTurno } from 'src/app/Modelo/reporte';
import { TurnoService } from 'src/app/servicios/turno.service';


@Component({
  selector: 'app-genrarreporte',
  templateUrl: './genrarreporte.component.html',
  styleUrls: ['./genrarreporte.component.css']
})

export class GenrarreporteComponent implements OnInit {


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


  //esquema de colores
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f00', '#0f0', '#0ff'],
  };
  single: ReporteTurno[];

  constructor(private turnoServicio:TurnoService) {

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

  ngOnInit(): void {
    this.getReporte();
  }

  getReporte() {

    this.turnoServicio.getReporte("").subscribe(result => {
      this.single = result;
    }
    );

  }

}

