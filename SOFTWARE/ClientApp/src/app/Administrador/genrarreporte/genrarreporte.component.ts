import { Component, OnInit } from '@angular/core';
import { LegendPosition } from '@swimlane/ngx-charts';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import jsPDF from 'jspdf';
import { ReporteTurno } from 'src/app/Modelo/reporte';
import { TurnoService } from 'src/app/servicios/turno.service';
import domtoimage from 'dom-to-image';



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
    
  generatePDF() {
    const data = document.getElementById('reportContent');
    if (data) {
      domtoimage.toPng(data)
        .then((dataUrl) => {
          const imgWidth = 208;
          const pageHeight = 295;
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            const imgHeight = img.height * imgWidth / img.width;
            const pdf = new jsPDF('p', 'mm', 'a4');
             // Añadir título
             pdf.setFontSize(22);
             pdf.setFont('helvetica', 'bold');
             pdf.setTextColor(36, 52, 71); // color RGB
             pdf.text('Reporte de Datos', 15, 15);

             // Añadir descripción
             pdf.setFontSize(12);
             pdf.setFont('times', 'normal');
             pdf.setTextColor(100);
             pdf.text('Este reporte muestra una visión general de los datos recolectados.', 15, 25);

             // Añadir imagen
             const position = 30; // Ajusta la posición de la imagen según sea necesario
             pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
             
             // Guardar el PDF
             pdf.save('reporte.pdf');
          };
        })
        .catch((error) => {
          console.error('Error capturing the chart:', error);
        });
    }
  }

}


