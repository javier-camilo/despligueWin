export class Tiempo {
  refHorario: string;
  horaInicio: Date;
  horaFinalizacion: Date;
  disponibilidad: boolean;
}

export class HorarioInputModel{
  fechaInicio: Date | null;
  fechaFin: Date | null;
  intervaloAtencion: number | null;
  numeroMaximoTurnos: number | null;
}


