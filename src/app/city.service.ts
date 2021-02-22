import { Injectable } from '@angular/core';
import { City } from './city';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  getCities(cidades : string[]):  Observable<City[]> {

    const url =    'http://localhost:5000/cidades'//'https://backendweatherapp.herokuapp.com' + '/cidades' //
    return this.http.post<City[]>(url, {cidades}).pipe(
      tap(_ => console.log('fetched cities' )),
      catchError(this.handleError<City[]>('getCities', []))
    );
  }


  getCity(cidade: String): Observable<City> {
    const preurl =   'http://localhost:8000/cidade';// 'https://backendweatherapp.herokuapp.com' + '/cidades'
    const url = `${preurl}` + '/' + cidade;
    return this.http.get<City>(url, ).pipe(
      tap(_ => console.log(`fetched cidade ${cidade}`)),
      catchError(this.handleError<City>(`getCity =${cidade}`))
    );
  }

  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

