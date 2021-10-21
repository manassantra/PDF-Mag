import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Access } from '../_models/access';

@Injectable({
  providedIn: 'root'
})
export class AccessService {


  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  addRole(model2:any) {
    return this.http.post(this.baseUrl + 'access/addrole' , model2).pipe(
      map((response: Access) => {
        const access = response;
        console.log(access);
      })
      );
  }

}
