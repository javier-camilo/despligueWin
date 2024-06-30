import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleHttpErrorService } from '../@base/handle-http-error-service.service';
import { Poblacion } from '../Modelo/poblacion';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PoblacionServiceService {



  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string,
    private handleErrorService: HandleHttpErrorService) {
      this.baseUrl="https://localhost:7240/";

  }

  post(poblacion:Poblacion): Observable<Poblacion> {

    return this.http.post<Poblacion>(this.baseUrl + 'api/Poblacion', poblacion)
        .pipe(
            tap(_ => this.handleErrorService.log('Guardado con exito')),
            catchError(this.handleErrorService.handleError<Poblacion>('Registrar motivo',undefined))
        );
  }

  get(operacion:string): Observable<Poblacion[]> {
    return this.http.get<Poblacion[]>(this.baseUrl + 'api/Poblacion')
        .pipe(
            tap(_ =>

              {

              if(operacion==="poblacionComponent")
              this.handleErrorService.log('Datos de la poblacion recibido');

              }
          ),
            catchError(this.handleErrorService.handleError<Poblacion[]>('Consulta poblacion', undefined))
        );
  }

  getId(id: string, operacionLLamado?:string): Observable<Poblacion> {
    const url = `${this.baseUrl + 'api/Poblacion'}/${id}`;
      return this.http.get<Poblacion>(url, httpOptions)
      .pipe(
        tap(_ =>

          {

              if(operacionLLamado==null){

                  this.handleErrorService.log('se consulto la poblacion con codigo = '+ id)

              }

          }

          ),
        catchError(this.handleErrorService.handleError<Poblacion>('Buscar poblacion', undefined))
      );
  }


  delete(poblacion: Poblacion| string): Observable<string> {
    const id = typeof poblacion === 'string' ? poblacion : poblacion.id;
    return this.http.delete(this.baseUrl + 'api/Poblacion/'+ id, {responseType: 'text'} )
    .pipe(
      tap(_ => this.handleErrorService.log("Poblacion Elimianda")),
      catchError(this.handleErrorService.handleError<string>('Elimiar poblcion', undefined))
    );
  }

  put(poblacion: Poblacion): Observable<any> {
    const url = `${this.baseUrl}api/Poblacion/${poblacion.id}`;
    return this.http.put(url, poblacion,  {responseType: 'text'} )
    .pipe(
      tap(_=> this.handleErrorService.log("se edito la poblacion correctamente")),
      catchError(this.handleErrorService.handleError<any>('Editar poblacion'))
    );
  }


}
