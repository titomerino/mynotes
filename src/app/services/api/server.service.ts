import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpBaseService } from 'src/app/interfaces/http-base-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService extends HttpBaseService {

  pokemonSubject = new BehaviorSubject <boolean>(false);

  constructor(protected http: HttpClient) {
    super(http, environment.api_server);
  }

  getNoteList(): Observable<any> {
    const url = 'api/notes';
    const response = this.getMethod(url);
    return response;
  }
}
