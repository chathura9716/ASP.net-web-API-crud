
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoyalCustServiceService {

  baseApiUrl = 'https://localhost:7299'
  constructor(private http: HttpClient) { }

  addLoyalCust(api: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseApiUrl + '/api/LoyaltyCust', api, { headers });
  }
  getAllLoyalCust() {
    return this.http.get<any>(this.baseApiUrl + '/api/LoyaltyCust');
  }
  updateLoyalCust(api: any, id: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.baseApiUrl + '/api/LoyaltyCust/' + id, api, { headers });
  }
  deleteLoyalCust(id: any) {
    return this.http.delete(this.baseApiUrl + '/api/LoyaltyCust/' + id);
  }
}
