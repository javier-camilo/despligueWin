import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Register } from '../Modelo/register';


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})


export class NavMenuComponent implements OnDestroy {


  datosUsuario: Register;
  menu: Menu[];
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private loginService:LoginService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.menu = [];
    this.datosUsuario=this.loginService.GetInformacionUsuario();
    this.cargarItem();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  salir(){
    this.loginService.logoutUser();
  }

  cargarItem() {

    let contarUsuario = 0;


    if (this.loginService.HaveAccessAdmin()) {

      this.menu = [];

      let admin: Menu[];

      admin = [
        { name: this.datosUsuario.nombre, route: "", icon: "" },
        { name: "Histórico", icon: "date_range", route: "/consultarHistorico" },
        { name: "Citas Ventanilla", icon: "date_range", route: "/citasVentanilla" },
        { name: "Registrar Atención", icon: "save", route: "/colaAtencion" },
        { name: "Reporte", icon: "history", route: "/reportesContratista" }
      ];

      this.menu = admin;

      contarUsuario = 1;

    }


    if (this.loginService.HaveAccessOwner()) {

      this.menu = [];

      let dueño: Menu[];


      dueño = [
        { name: this.datosUsuario.nombre, route: "", icon: "" },
        { name: "Listado de cola",  icon: "history",  route: "/cola"},
        { name: "Registrar motivo", icon: "done", route: "/registrarMotivo" },
        { name: "Consultar Motivo", icon: "assignment", route: "/consultarMotivo" },
        { name: "Registrar Población", icon: "accessible", route: "/registrarPoblacion" },
        { name: "Consultar Población", icon: "accessibility_new", route: "/consultarPoblacion" },
        { name: "Crear Horario", icon: "flip_to_back", route: "/crearHorario" },
        { name: "consultar Horario", icon: "flip_to_front", route: "/consultarHorario"},
        { name: "Registrar Usuario", icon: "supervised_user_circle", route: "/registroAdministrador" },
        { name: "Gestionar permisos", icon: "supervised_user_circle", route: "/roles" },
        { name: "Reporte", icon: "receipt", route: "/reporteAdministrador" },

      ];

      this.menu = dueño;

      contarUsuario = 1;

    }

    if (contarUsuario==0) {

        this.menu = [];

      let dueño: Menu[];


        dueño = [
          { name: this.datosUsuario.nombre, route:"",icon:""},
          { name: "Listado de cola",  icon: "history",  route: "/cola"},
          { name: "Solicitar cita", icon: "search", route: "/registroCita" },
          { name: "Tu turno",  icon: "find_in_page",  route: "/consultaTurno"},
        ];

        this.menu = dueño;
    }


  }

}


export class Menu {
  route:string | null;
  icon:string | null;
  name:string | null;
}
