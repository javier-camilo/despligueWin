import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { CitasComponent } from './Solicitante/citas/citas.component';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { RegistrarMotivoComponent } from './Administrador/gestionMotivo/registrar-motivo/registrar-motivo.component';
import { ConsultarMotivoComponent } from './Administrador/gestionMotivo/consultar-motivo/consultar-motivo.component';
import { EdicionMotivoComponent } from './Administrador/gestionMotivo/edicion-motivo/edicion-motivo.component';
import { MatTableModule } from '@angular/material/table';
import { RegistrarPoblacionComponent } from './Administrador/gestionPoblacion/registrar-poblacion/registrar-poblacion.component';
import { ConsultarPoblacionComponent } from './Administrador/gestionPoblacion/consultar-poblacion/consultar-poblacion.component';
import { EditarPoblacionComponent } from './Administrador/gestionPoblacion/editar-poblacion/editar-poblacion.component';
import { FiltroPoblacionPipe } from './pipes/filtro-poblacion.pipe';
import { FiltroMotivoPipe } from './pipes/filtro-motivo.pipe';
import { FiltroEdadPipe } from './pipes/filtro-edad.pipe';
import { LoginComponent } from './gestionUsuarios/login/login.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatSelectModule} from '@angular/material/select';
import { RegistroComponent } from './gestionUsuarios/registro/registro.component';
import { LayoutComponent } from './gestionUsuarios/layout/layout.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PerfilComponent } from './gestionUsuarios/perfil/perfil.component';
import { ColaAtencionComponent } from './Atencion/cola-atencion/cola-atencion.component';
import { RolesComponent } from './Administrador/gestionPermiso/roles/roles.component';
import { RegistrarAtencionComponent } from './Atencion/registrar-atencion/registrar-atencion.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import { RegistroAdminComponent } from './Administrador/gestionPermiso/registro-admin/registro-admin.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CitasVentanillaComponent } from './Atencion/citas-ventanilla/citas-ventanilla.component';
import { ConsultarHistoricoComponent } from './Atencion/gestionarHistorico/consultar-historico/consultar-historico.component';
import { HistoricoComponent } from './Atencion/gestionarHistorico/historico/historico.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ConsultaTurnoComponent } from './Solicitante/consulta-turno/consulta-turno.component';
import { InformacionTurnoUsuarioComponent } from './Solicitante/informacion-turno-usuario/informacion-turno-usuario.component';
import { ConsultarhorarioComponent } from './Administrador/gestionhorario/consultarhorario/consultarhorario.component';
import { CrearhorarioComponent } from './Administrador/gestionhorario/crearhorario/crearhorario.component';
import { TicketComponent } from './Solicitante/ticket/ticket.component';
import { GenrarreporteComponent } from './administrador/genrarreporte/genrarreporte.component';
import { AtenderCitaComponent } from './Atencion/atender-cita/atender-cita.component';
import { ReportesComponent } from './atencion/reportes/reportes.component';




@NgModule({
  declarations: [
    PageNotFoundComponent,
    ColaAtencionComponent,
    PerfilComponent,
    RegistrarAtencionComponent,
    AppComponent,
    RolesComponent,
    ConsultarhorarioComponent,
    NavMenuComponent,
    ConsultaTurnoComponent,
    InformacionTurnoUsuarioComponent,
    HomeComponent,
    FetchDataComponent,
    CitasComponent,
    DialogoConfirmacionComponent,
    TicketComponent,
    CrearhorarioComponent,
    GenrarreporteComponent,
    AtenderCitaComponent,
    ReportesComponent,
    RegistrarMotivoComponent,
    CitasVentanillaComponent,
    ConsultarMotivoComponent,
    ConsultarHistoricoComponent,
    HistoricoComponent,
    EdicionMotivoComponent,
    RegistrarPoblacionComponent,
    ConsultarPoblacionComponent,
    EditarPoblacionComponent,
    RegistroAdminComponent,
    RegistroComponent,
    FiltroPoblacionPipe,
    FiltroMotivoPipe,
    FiltroEdadPipe,
    LoginComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    MatToolbarModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatGridListModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule.forRoot([]),
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
    },
  { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogoConfirmacionComponent
  ]
})
export class AppModule {
}
