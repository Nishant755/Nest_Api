import { Role } from "../enum/role.enum";


export interface GetUserResponse {
    id:number;
    name:string;
    email:string;
    password:string;
    role:Role;
}
export interface AddUserResponse {
    message:string;
    data:GetUserResponse;
}   