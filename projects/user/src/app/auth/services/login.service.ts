import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/user/src/environments/environment';
import { Login, Register } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(model:Login){
    return this.http.post(environment.baseApi.replace('tasks','auth')+'/login',model)
  }

  register(model:Register){
    return this.http.post(environment.baseApi.replace('tasks','auth')+'/createAccount',model)

  }
}
