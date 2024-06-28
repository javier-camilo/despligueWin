export class Register {
  userName:string | null;
  email:string | null;
  password:string | null;
  identificacion:string | null;
  nombre:string | null;
  apellido:string | null;
  telefono:string | null;
}

export class UserVista extends Register{
  phoneNumber: string | null;
}

export class UpdatePermission {
  userName: string | null;
}
