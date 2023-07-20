import { Injectable } from '@angular/core';
import { LoginService } from '../LoginService/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(service:LoginService) { }
  
  loggedIn(){
    let data=sessionStorage.getItem('userData');
    let userInfo=(data)?JSON.parse(data):null;
    console.log(data)
    console.log(userInfo)
    if(userInfo!=null){
      return true;
    }
    else
    {
      return false;
    }

  }
}
