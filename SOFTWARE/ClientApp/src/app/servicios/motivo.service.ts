import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Motivo } from '../Modelo/motivo';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MotivoService {


  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl="https://localhost:7240/";

  }

  post(motivo:Motivo): Observable<Motivo> {

    return this.http.post<Motivo>(this.baseUrl + 'api/Motivo', motivo)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Motivo>('Registrar motivo',undefined))
        );
  }


  get(operacion:string): Observable<Motivo[]> {
    return this.http.get<Motivo[]>(this.baseUrl + 'api/Motivo')
        .pipe(
            tap(_ =>

              {

              if(operacion==="motivoComponent")
              this.handleErrorService.log('Datos de los motivos recibido');

              }
          ),
            catchError(this.handleErrorService.handleError<Motivo[]>('Consulta area', undefined))
        );
  }

  getId(id: string, operacionLLamado?:string): Observable<Motivo> {
    const url = `${this.baseUrl + 'api/Motivo'}/${id}`;
      return this.http.get<Motivo>(url, httpOptions)
      .pipe(
        tap(_ =>

          {

              if(operacionLLamado==null){

                  this.handleErrorService.log('se consulto el motivo = '+ id)

              }

          }

          ),
        catchError(this.handleErrorService.handleError<Motivo>('Buscar motivo', undefined))
      );
  }


  delete(motivo: Motivo| string): Observable<string> {
    const id = typeof motivo === 'string' ? motivo : motivo.id;
    return this.http.delete(this.baseUrl + 'api/Motivo/'+ id, {responseType: 'text'} )
    .pipe(
      tap(_ => this.handleErrorService.log("motivo eliminado")),
      catchError(this.handleErrorService.handleError<string>('Elimiar Motivo', undefined))
    );
  }

  put(motivo: Motivo): Observable<any> {
    const url = `${this.baseUrl}api/Motivo/${motivo.id}`;
    return this.http.put(url, motivo,  {responseType: 'text'} )
    .pipe(
      tap(_=> this.handleErrorService.log("se edito el motivo correctamente")),
      catchError(this.handleErrorService.handleError<any>('Editar Motivo'))
    );
  }




}
