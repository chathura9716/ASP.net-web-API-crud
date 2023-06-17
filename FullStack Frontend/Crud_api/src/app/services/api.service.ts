import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseApiUrl = 'https://localhost:7299'
  constructor(private http: HttpClient) { }


  postProgram(api: ApiService) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseApiUrl + '/api/employees', api, { headers });
  }
  getProgram() {
    return this.http.get<any>(this.baseApiUrl + '/api/employees');
  }
  updateProgram(api: ApiService, id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.baseApiUrl + '/api/employees/' + id, api, { headers });
  }
  deleteProgram(id: string) {
    return this.http.delete(this.baseApiUrl + '/api/employees/' + id);
  }
}
