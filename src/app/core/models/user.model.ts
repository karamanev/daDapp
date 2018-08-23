export interface Roles {
  reader: boolean;
  banned?: boolean;
  admin?:  boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles
}
