import { User } from "../entities";
interface UserBody {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
}
export declare const createUser: (body: UserBody) => Promise<User>;
export declare const recoverPassword: (email: string) => Promise<string>;
export declare const updateSenhaCodidoEmail: (codigo: string, pass: string) => Promise<User | undefined>;
export {};
