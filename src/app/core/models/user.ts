export interface Roles {
  reader: boolean;
  author?: boolean;
  admin?:  boolean;
}

export interface User {
    uid: string;
    email: string;
    roles: Roles
}
