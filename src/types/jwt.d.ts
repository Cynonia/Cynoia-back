export interface JwtPayloadCustom {
  id: number;
  login: string;
  email: string;
  role: string;
  roleId: number;
  iat?: number;
  exp?: number;
}