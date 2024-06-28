import { Tiempo } from './tiempo';
export class Turno {

  numero:number;

  motivo:string | null;

  asistencia:string | null;

  descripcionOperacion:string | null;

  contratistaAtendio:string | null;

  refTiempo:string;

  refSolicitante:string | null;

  fechaFinalizacion: string;

  poblacion: string | null;

  observacion: string | null;

  tiempo: Tiempo;

}

export class TurnoHistorico extends Turno{
  nombreSolicitante: string | null;
}
