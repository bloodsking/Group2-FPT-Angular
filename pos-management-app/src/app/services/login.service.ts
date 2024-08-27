import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "../models/user.model";
import { map } from "rxjs/operators";

const baseUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(username: string, password:string): Observable<boolean> {
    return this.http
    .get<User[]>(`${baseUrl}?username=${username}&password=${password}`)
    .pipe(map((users) => users.length > 0));
  }
}
