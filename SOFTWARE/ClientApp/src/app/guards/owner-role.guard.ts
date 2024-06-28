import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicios/login.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerRoleGuard implements CanActivate {


    constructor(private service:LoginService,private route:Router){

  }
  canActivate() {

    if(this.service.HaveAccessOwner()){
     return true;
    }else{
     this.route.navigate(['']);
     return false;
    }

  }

}
