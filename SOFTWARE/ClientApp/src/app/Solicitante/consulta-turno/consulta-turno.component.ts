import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InformacionTurnoUsuarioComponent } from '../informacion-turno-usuario/informacion-turno-usuario.component';

@Component({
  selector: 'app-consulta-turno',
  templateUrl: './consulta-turno.component.html',
  styleUrls: ['./consulta-turno.component.css']
})
export class ConsultaTurnoComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  cargarModal() {

    this.dialog.open(InformacionTurnoUsuarioComponent);

  }

}
