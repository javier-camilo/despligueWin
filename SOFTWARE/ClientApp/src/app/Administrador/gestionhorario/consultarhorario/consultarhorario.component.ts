import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tiempo } from 'src/app/Modelo/tiempo';
import { DialogoConfirmacionComponent } from 'src/app/dialogo-confirmacion/dialogo-confirmacion.component';
import { TiempoService } from 'src/app/servicios/tiempo.service';

@Component({
  selector: 'app-consultarhorario',
  templateUrl: './consultarhorario.component.html',
  styleUrls: ['./consultarhorario.component.css']
})
export class ConsultarhorarioComponent implements OnInit {

  protected selectedDate: Date | null = null;
  protected listadoHorario: Tiempo[];
  protected filteredHorarios: Tiempo[] = [];
  protected dataSource: any;
  protected displayedColumns: string[] = ['refHorario','horaInicio', 'horaFinalizacion', 'disponibilidad'];

  constructor(private tiempoService:TiempoService,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.tiempoService.getTiempoAdministrador("").subscribe(_ =>
      {
      this.listadoHorario = _;
      this.dataSource = new MatTableDataSource(this.listadoHorario);
      }
    );
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

      this.dataSource.data = this.filteredHorarios;
    } else {
      this.dataSource.data = this.listadoHorario;
    }
  }

  borrarHorario(){
    let ref = this.dialog.open(DialogoConfirmacionComponent, {data: {name:"Guardar", descripcion:"¿Desea eliminar los datos?"}});
    let fecha:Tiempo;
    fecha=new Tiempo();
    ref.afterClosed().subscribe(result => {
      if(result=="true"){
        this.filteredHorarios.forEach(element => {
          if(this.selectedDate==element.horaInicio){
            fecha=element;
          }
        });
        this.tiempoService.delete(fecha).subscribe();
      }
    })
  }


}
