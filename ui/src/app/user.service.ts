import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private webService:WebRequestService) { }

  signUp(payload: Object) {
    let uri = "users"
    return this.webService.post(uri,payload);
  }
}
