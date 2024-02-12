import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from './Environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  addData(formdata:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}data/add`,formdata)
  }
  getData(formdata:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}data/list`,formdata)
  }
  updateData(formdata:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}user/update-data`,formdata)
  }

  deleteData(formdata:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}user/delete-data`,formdata)
  }
}
